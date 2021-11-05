import styled from 'styled-components';
import { Typography, Input as MInput, Button as MButton } from '@mui/material';
import { Link as RLink } from 'react-router-dom';
import { Form as UForm } from '@unform/web';

import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background: rgba(40, 40, 40, 0.5);
`;

export const LoginContainer = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 500px;
  height: 600px;

  background-color: #fff;
  border-radius: 5px;

  @media only screen and (max-width: 700px) {
    max-width: 90vw;
    height: 90vh;
  }
`;

export const H1 = styled(Typography)`
  && {
    font-size: 30px;
    margin: 50px;
  }
`;

export const Form = styled(UForm)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 50%;
  width: 100%;
`;

export const InputLabel = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const Input = styled(MInput)`
  && {
    width: 200px;
    height: 30px;

    margin-left: 30px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;

  align-self: center;
  max-height: 40px;
  padding-top: 30px;
  padding-bottom: 40px;
`;

export const NewSignUpContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const NewSignUp = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const Link = styled(RLink)`
  color: #00f;
  font-size: 14px;
  font-weight: 500;
`;

export const Button = styled(MButton)`
  && {
    display: flex;
    align-self: center;
    width: 250px;
    background-color: #4bb543;
    color: #fff;

    &:hover {
      background-color: ${shade(0.2, '#4bb543')};
    }
  }
`;
