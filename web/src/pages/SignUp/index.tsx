import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import {
  Container,
  SingUpContainer,
  H1,
  Form,
  Input,
  InputLabel,
  InputContainer,
  AlreadySignedUpContainer,
  GoToLogin,
  Link,
  Button,
} from './styles';

import api from '../../services/api';

interface IUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<IUser>({ email: '', password: '' });
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IUser) => {
      try {
        await api.post('/api/auth/signup', data);

        history.push('/');
      } catch (e: any) {
        return e;
      }
    },
    [history]
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
      <SingUpContainer>
        <H1>Cadastre-se</H1>
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
          <Button type="submit">Cadastrar</Button>
        </Form>
        <AlreadySignedUpContainer>
          <GoToLogin>
            Já possui cadastro? <Link to="/">Realizar login</Link>
          </GoToLogin>
        </AlreadySignedUpContainer>
      </SingUpContainer>
    </Container>
  );
};

export default Login;
