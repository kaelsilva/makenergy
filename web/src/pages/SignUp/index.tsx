import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import {
  Container,
  SingUpContainer,
  H1,
  Form,
  InputLabel,
  InputContainer,
  AlreadySignedUpContainer,
  GoToLogin,
  Link,
  Button,
  Logo,
  Background,
} from './styles';

import logo from '../../assets/images/logo-Makenergy-01.png';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

interface IUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<IUser>({ email: '', password: '' });
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IUser) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Insira um e-mail')
            .email('Formato de e-mail inválido'),
          password: Yup.string().min(6, 'Mínimo: 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/api/auth/signup', data);

        history.push('/');
      } catch (err: Yup.ValidationError | unknown) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err as Yup.ValidationError);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history]
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
    <Background>
      <Container>
        <SingUpContainer>
          <Logo src={logo} alt="Logo da empresa" />
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
    </Background>
  );
};

export default Login;
