import React, { useState } from 'react';
import { FiHome, FiActivity, FiLogOut } from 'react-icons/fi';
import * as S from './styles';
import logo from '../../assets/images/logo-Sharenergy-01.png';

const Toolbar: React.FC = () => {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  return (
    <>
      {menuClicked && (
        <S.MobileContainer>
          <S.LinkList>
            <S.ListItem>
              <FiHome size="24px" />
              <S.ItemLink to="/">Clientes</S.ItemLink>
            </S.ListItem>
            <S.ListItem>
              <FiActivity size="24px" />
              <S.ItemLink to="/chart">Gráfico</S.ItemLink>
            </S.ListItem>
            <S.ListItem>
              <FiLogOut size="24px" />
              <S.ItemLink to="/">Logout</S.ItemLink>
            </S.ListItem>
          </S.LinkList>
        </S.MobileContainer>
      )}

      <S.Toolbar>
        <S.FiMenu onClick={() => setMenuClicked(!menuClicked)} />
        <S.LogoToolbar src={logo} alt="Logo for the app" />
      </S.Toolbar>
    </>
  );
};

export default Toolbar;
