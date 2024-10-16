import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

interface ButtonProps {
  outline?: boolean;
}

export const Button = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;
  height: 50px;
  background-color: #2dace3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({outline}) =>
    outline &&
    `
      background-color: transparent;
      border: 2px solid #2DACE3;
  `}
`;

export const ButtonText = styled(Text)<ButtonProps>`
  color: #fff;
  font-size: 16px;
  font-weight: 600;

  ${({outline}) =>
    outline &&
    `
      color: #2DACE3;
  `}
`;
