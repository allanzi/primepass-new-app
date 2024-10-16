import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';

export const Content = styled(View)``;

export const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  background-color: #e9e9e9;
  border: 2px solid #e9e9e9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #505050;
  font-size: 14px;
  padding: 15px 10px;
`;

export const Error = styled(Text)`
  margin-top: 4px;
  font-size: 12px;
  color: #ff0000;
  text-align: right;
`;
