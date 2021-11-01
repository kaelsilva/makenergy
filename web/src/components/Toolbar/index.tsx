import React from 'react';
import { FiMenu } from 'react-icons/fi';
import * as S from './styles';
import logo from '../../assets/images/logo-Sharenergy-01.png';

const Toolbar: React.FC = () => (
  <>
    <S.Toolbar>
      <FiMenu size="48px" />
      <S.LogoToolbar src={logo} alt="Logo for the app" />
    </S.Toolbar>
  </>
);

export default Toolbar;
