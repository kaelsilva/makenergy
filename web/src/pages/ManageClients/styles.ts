import styled from 'styled-components';
import {
  Button as MButton,
  List as MList,
  ListItemText as MListItemText,
  Input,
  Typography,
  FormLabel,
} from '@mui/material';
import { FiPlus as MFiPlus } from 'react-icons/fi';
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
  align-items: center;
  max-height: 40px;
  max-width: 70vw;
  width: 60vw;
  margin: 5px 5px 5px 30px;
  border-color: #efefef;
  border-width: 2px;
  border-style: solid;

  @media only screen and (max-width: 700px) {
    margin: 5px 0 0 30px;
    max-width: 80vw;
    width: 80vw;
  }
`;

export const ListItemText = styled(MListItemText)`
  background-color: #fefefe;
  margin-left: 20px;
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

export const NewClientButton = styled(MButton)`
  && {
    background-color: #4bb543;
    color: #fff;
    border-radius: 5px;
    margin-left: 30px;

    max-width: 200px;
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
    z-index: 2;
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
  max-height: 30px;

  #Percent {
    width: 30px;
    max-width: 30px;
  }
`;

export const LabelAndInputContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  margin: 10px;
  max-height: 50px;
  justify-content: space-evenly;
  align-items: center;
`;

export const Label = styled(FormLabel)`
  && {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100%;

  @media only screen and (max-width: 700px) {
    justify-content: center;
  }
`;

export const ClientListContainer = styled.section`
  display: flex;
  flex: 1;
  margin-top: 70px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

export const FiPlusStyled = styled(MFiPlus)`
  width: 28px;
  color: #fff;
`;

export const BlurBackground = styled.div`
  display: flex;
  flex: 1;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background: rgba(30, 30, 30, 0.8);
  width: 100vw;
  height: 100%;
`;
