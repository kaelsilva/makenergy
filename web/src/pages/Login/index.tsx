import { FormControl } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import {
  Container,
  LoginContainer,
  H1,
  Form,
  InputLabel,
  InputContainer,
  NewSignUpContainer,
  NewSignUp,
  Link,
  Button,
  Logo,
  Background,
} from './styles';

import logo from '../../assets/images/logo-Sharenergy-01.png';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

interface IUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<IUser>({ email: '', password: '' });
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IUser) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/clients');
      } catch (err: Yup.ValidationError | unknown) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err as Yup.ValidationError);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast]
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
        <LoginContainer>
          <Logo src={logo} alt="Logo da empresa" />
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
    </Background>
  );
};

export default Login;
