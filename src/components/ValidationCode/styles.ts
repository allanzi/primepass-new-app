import {Text, View} from 'react-native';
import styled from 'styled-components';

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Error = styled(Text)`
  margin-top: 4px;
  font-size: 12px;
  color: #ff0000;
  text-align: right;
`;
