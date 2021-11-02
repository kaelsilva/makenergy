import React, { useState } from 'react';
import { FiHome, FiActivity, FiLogOut } from 'react-icons/fi';
import { Container, LinkList, ItemLink, ListItem } from './styles';

const Sidebar: React.FC = () => {
  return (
    <>
      <Container>
        <LinkList>
          <ListItem to="/">
            <FiHome size="24px" />
            <ItemLink>Clientes</ItemLink>
          </ListItem>
          <ListItem to="/chart">
            <FiActivity size="24px" />
            <ItemLink>Gráfico</ItemLink>
          </ListItem>
          <ListItem to="/">
            <FiLogOut size="24px" />
            <ItemLink>Logout</ItemLink>
          </ListItem>
        </LinkList>
      </Container>
    </>
  );
};

export default Sidebar;
