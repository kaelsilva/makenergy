import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-left: -20%;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 16px;
  width: 180px;

  border: 2px solid #212329;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #ff0000;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #1ba2a1;
      border-color: #1ba2a1;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #1ba2a1;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;

    outline: none;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
    margin-left: 16px;
  }

  span {
    background: #ffe0e0;
    color: #ff3333;

    &::before {
      border-color: #ffe0e0 transparent;
    }
  }
`;
