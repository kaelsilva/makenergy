import { FormControl } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import {
  Container,
  LoginContainer,
  H1,
  Form,
  Input,
  InputLabel,
  InputContainer,
  NewSignUpContainer,
  NewSignUp,
  Link,
  Button,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface IUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<IUser>({ email: '', password: '' });
  const handleSubmit = useCallback(
    async (data: IUser) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/clients');
      } catch (e: any) {
        return e;
      }
    },
    [signIn, history]
  );

  const handleInputChange = (
    input: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUser({
      email: input.target.value,
      password: user.password,
    });
  };

  return (
    <Container>
      <LoginContainer>
        <H1>Login</H1>
        <Form ref={formRef} onSubmit={() => handleSubmit(user)}>
          <InputContainer>
            <InputLabel>Usuário:</InputLabel>
            <Input
              type="text"
              name="email"
              placeholder="E-mail"
              value={user.email}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Senha:</InputLabel>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={(e) =>
                setUser({ email: user.email, password: e.target.value })
              }
            />
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <NewSignUpContainer>
          <NewSignUp>
            Não possui cadastro? <Link to="/signup">Criar cadastro</Link>
          </NewSignUp>
        </NewSignUpContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
