import styled from 'styled-components';
import {
  Button as MButton,
  Toolbar as MToolbar,
  List as MList,
  ListItemText as MListItemText,
  FormControl,
  Input,
  Typography,
} from '@mui/material';
import { shade } from 'polished';

export const Button = styled(MButton)`
  background-color: #000;
`;

export const Toolbar = styled(MToolbar)`
  background-color: #fff;
  align-items: center;
`;

export const LogoToolbar = styled.img`
  height: 56px;
  margin-left: 48px;
`;

export const List = styled(MList)`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export const ListItemText = styled(MListItemText)`
  border-color: #efefef;
  border-width: 2px;
  border-style: solid;
`;

export const DeleteButton = styled(MButton)`
  && {
    background-color: tomato;
    color: #fff;
    border-radius: 5px;

    &:hover {
      background-color: ${shade(0.2, 'tomato')};
    }
  }
`;

export const CreateButton = styled(MButton)`
  && {
    background-color: #4bb543;
    color: #fff;
    border-radius: 5px;

    &:hover {
      background-color: ${shade(0.2, '#4BB543')};
    }
  }
`;

export const CreationContainer = styled.form`
  && {
    position: relative;
    top: -1px;
    display: flex;
    height: 300px;
    justify-content: space-between;
    width: 400px;
    padding: 20px;

    border-style: solid;
    border-width: 2px;
    border-color: #efefef;
  }
`;

export const InputText = styled(Input)`
  padding: 20px;
`;

export const H1 = styled(Typography)`
  && {
    align-self: center;

    font-size: 28px;
    font-weight: 500;
  }
`;
