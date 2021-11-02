import styled from 'styled-components';

import { FiMenu as MFiMenu } from 'react-icons/fi';

import {
  Toolbar as MToolbar,
  List,
  ListItem as MListItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { shade } from 'polished';
import AppearFromLeft from '../animations/AppearFromLeft';

export const FiMenu = styled(MFiMenu)`
  && {
    height: 48px;
    width: 48px;
    color: #000;
    visibility: hidden;
    @media only screen and (max-width: 700px) {
      visibility: visible;
    }
  }
`;

export const Toolbar = styled(MToolbar)`
  && {
    background-color: #fff;
    width: 100vw;
    align-items: center;
    position: fixed;
    z-index: 1;
  }
`;

export const LogoToolbar = styled.img`
  height: 56px;
  margin-left: 48px;
`;

export const Container = styled.nav`
  display: flex;
  width: 25vw;

  animation: ${AppearFromLeft} 0.5s;

  @media only screen and (max-width: 700px) {
    visibility: hidden;
  }
`;

export const MobileContainer = styled.nav`
  display: flex;
  width: 100vw;
  height: 100vh;
  margin-top: 40px;

  animation: ${AppearFromLeft} 0.5s;

  background-color: #fff;

  position: fixed;
  z-index: 1;
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
