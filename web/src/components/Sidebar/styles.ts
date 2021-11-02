import styled from 'styled-components';
import { List, ListItem as MListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { shade } from 'polished';
import AppearFromLeft from '../animations/AppearFromLeft';

export const Container = styled.nav`
  display: flex;
  width: 25vw;

  animation: ${AppearFromLeft} 0.5s;
`;

export const LinkList = styled(List)`
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 100%;
  margin-top: 10px;
`;

export const ListItem = styled(MListItem)`
  display: flex;
  flex: 1;
  cursor: pointer;

  height: 50px;
  max-height: 50px;

  &:hover {
    width: 100%;
    background-color: ${shade(0.1, '#fff')};
  }
`;

export const ItemLink = styled(Link)`
  text-decoration: none;
  font-size: 24px;
  color: #000;

  margin-left: 10px;
`;
