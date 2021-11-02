import styled from 'styled-components';
import { List, ListItem as MListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { shade } from 'polished';
import AppearFromLeft from '../animations/AppearFromLeft';

export const Container = styled.nav`
  display: flex;
  width: 25vw;

  animation: ${AppearFromLeft} 0.5s;

  margin-top: 70px;

  @media only screen and (max-width: 700px) {
    display: block;
    visibility: hidden;
    width: 0;
  }
`;

export const LinkList = styled(List)`
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 100%;
  margin-top: 10px;
`;

export const ListItem = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 10px;

  cursor: pointer;

  height: 50px;
  max-height: 50px;

  margin-left: 10px;

  text-decoration: none;

  color: #d6df27;

  &:hover {
    width: 100%;
    background-color: ${shade(0.1, '#fff')};
  }

  &:active {
    color: #1ba2a1;
  }
`;

export const ItemLink = styled(Typography)`
  && {
    font-size: 24px;
    color: #000;

    margin-left: 10px;
  }
`;
