import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@energy:token');
    const user = localStorage.getItem('@energy:user');

    if (token && user) {
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };
      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });

    const token = response.data.token!;

    localStorage.setItem('@energy:token', token);
    localStorage.setItem('@energy:user', email);

    api.defaults.headers.common = { Authorization: `Bearer ${token}` };

    setData({ token, user: email });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@energy:token');
    localStorage.removeItem('@energy:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
