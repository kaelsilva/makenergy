import React, { useState } from 'react';
import { FiHome, FiActivity, FiLogOut } from 'react-icons/fi';
import * as S from './styles';
import logo from '../../assets/images/logo-Makenergy-01.png';
import { useAuth } from '../../hooks/auth';

const Toolbar: React.FC = () => {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const { signOut } = useAuth();

  return (
    <>
      {menuClicked && (
        <S.MobileContainer>
          <S.LinkList>
            <S.ListItem to="/">
              <FiHome size="24px" />
              <S.ItemLink>Clientes</S.ItemLink>
            </S.ListItem>
            <S.ListItem to="/chart">
              <FiActivity size="24px" />
              <S.ItemLink>Gráfico</S.ItemLink>
            </S.ListItem>
            <S.ListItem onClick={signOut} to="/">
              <FiLogOut size="24px" />
              <S.ItemLink>Logout</S.ItemLink>
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
