import { Typography, Select as MSelect } from '@mui/material';
import styled from 'styled-components';

export const ContentContainer = styled.div`
  padding-top: 80px;
  width: 100%;
  display: flex;
  @media only screen and (max-width: 1130px) {
    flex-direction: column;
  }
`;

export const BodyContainer = styled.body`
  margin: 0;
  text-decoration: none;

  display: flex;
  max-width: 100%;
  flex: 1;

  @media only screen and (max-width: 1130px) {
    flex-direction: column;
    padding-left: 10vw;
  }
`;

export const DataContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex: 1;

    max-height: 200px;
  }
`;

export const DataLineContainer = styled.div`
  && {
    display: flex;
    flex: 1;

    justify-content: flex-start;

    padding-left: 20px;

    min-width: 400px;
  }
`;

export const DataLabel = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const DataValue = styled(Typography)`
  && {
    display: flex;
    flex: 1;

    font-size: 18px;
    font-weight: 400;
    padding-left: 50px;
    padding-right: 100px;

    justify-content: flex-end;
  }
`;

export const Select = styled(MSelect)`
  && {
    max-width: 100px;
  }
`;

export const ChartContainer = styled.div`
  width: 40%;

  @media only screen and (max-width: 1130px) {
    width: 90%;
  }
`;
