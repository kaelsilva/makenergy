import styled from 'styled-components';
import { Typography, Input as MInput, Button as MButton } from '@mui/material';
import { Link as RLink } from 'react-router-dom';
import { shade } from 'polished';
import { Form as UForm } from '@unform/web';
import bgImg from '../../assets/images/usina-solo1.jpg';

export const Background = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background: url(${bgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background: linear-gradient(
    to right,
    rgb(236, 229, 221) 0%,
    rgba(0, 162, 162, 0.5)
  );
`;

export const SingUpContainer = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 500px;
  height: 600px;

  background-color: #fff;
  border-radius: 10px;

  @media only screen and (max-width: 700px) {
    max-width: 90vw;
    height: 90vh;
  }
`;

export const H1 = styled(Typography)`
  && {
    font-size: 30px;
    margin: 50px;
    margin-bottom: -10px;
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
    display: flex;
    justify-self: flex-start;
    width: 50%;
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
  width: 330px;

  align-self: center;
  max-height: 30px;
  padding-bottom: 40px;
`;

export const AlreadySignedUpContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const GoToLogin = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const Link = styled(RLink)`
  color: #1ba2a1;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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

export const Logo = styled.img`
  height: 56px;
  padding-top: 30px;
`;
