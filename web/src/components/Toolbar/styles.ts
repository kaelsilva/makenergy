import styled from 'styled-components';

import { FiMenu as MFiMenu } from 'react-icons/fi';

import {
  Toolbar as MToolbar,
  List,
  ListItem as MListItem,
  Typography,
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
    @media only screen and (max-width: 1130px) {
      visibility: visible;
    }
  }
`;

export const Toolbar = styled(MToolbar)`
  && {
    background-color: #fafafa;
    width: 100vw;
    align-items: center;
    position: fixed;
    z-index: 1;
    padding: 0;
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
  margin-top: 50px;

  animation: ${AppearFromLeft} 0.5s;

  background-color: #fff;

  position: fixed;
  z-index: 2;
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
