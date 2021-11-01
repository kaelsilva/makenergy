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

export const List = styled(MList)`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export const ListItemContainer = styled.div`
  display: flex;
  flex: 1;
  height: 50px;
  border-color: #efefef;
  border-width: 2px;
  border-style: solid;
`;

export const ListItemText = styled(MListItemText)`
  background-color: #fefefe;
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
      background-color: ${shade(0.2, '#4bb543')};
    }
  }
`;

export const EditButton = styled(MButton)`
  && {
    background-color: #5434bb;
    color: #fff;
    border-radius: 5px;

    &:hover {
      background-color: ${shade(0.2, '#5434bb')};
    }
  }
`;

export const CancelButton = styled(MButton)`
  && {
    background-color: #ccc;
    color: #000;
    border-radius: 5px;

    &:hover {
      background-color: ${shade(0.2, '#ccc')};
    }
  }
`;

export const NewButton = styled(MButton)`
  && {
    background-color: #fff;
    color: #4bb543;
    width: 60px;
    min-width: 60px;
    height: 60px;
    min-height: 60px;
    border-radius: 50%;

    &:hover {
      background-color: ${shade(0.2, '#fff')};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-content: flex-end;
`;

export const CreationContainer = styled.form`
  && {
    background-color: #fff;
    position: absolute;
    z-index: 1;
    top: 100px;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: space-between;
    width: 400px;
    padding: 20px;

    border-style: solid;
    border-width: 2px;
    border-color: #efefef;
  }
`;

export const EditContainer = styled.form`
  && {
    background-color: #fff;
    position: absolute;
    z-index: 1;
    top: 100px;
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    flex-grow: 1;
    overflow-y: auto;
    height: 400px;
    justify-content: space-between;
    width: 400px;
    padding: 50px;

    border-style: solid;
    border-width: 2px;
    border-color: #efefef;
  }
`;

export const H1 = styled(Typography)`
  && {
    align-self: center;

    font-size: 28px;
    font-weight: 500;
  }
`;

export const CreationContainerHeader = styled.div`
  display: flex;
  flex: 1;
`;

export const InputText = styled(Input)`
  padding: 20px;
`;
