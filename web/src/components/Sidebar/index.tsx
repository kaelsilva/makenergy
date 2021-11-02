import React, { useState } from 'react';
import { FiHome, FiActivity, FiLogOut } from 'react-icons/fi';
import { Container, LinkList, ItemLink, ListItem } from './styles';

const Sidebar: React.FC = () => {
  const [menuClicked, setMenuClicked] = useState<boolean>(true);
  return (
    <>
      <Container>
        <LinkList>
          <ListItem>
            <FiHome size="24px" />
            <ItemLink to="/">Clientes</ItemLink>
          </ListItem>
          <ListItem>
            <FiActivity size="24px" />
            <ItemLink to="/chart">Gráfico</ItemLink>
          </ListItem>
          <ListItem>
            <FiLogOut size="24px" />
            <ItemLink to="/">Logout</ItemLink>
          </ListItem>
        </LinkList>
      </Container>
    </>
  );
};

export default Sidebar;
