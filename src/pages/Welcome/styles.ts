import styled from 'styled-components';
import {Image, Text as TextRN, View} from 'react-native';
import {ImageBackground} from 'react-native';

export const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  resize-mode: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Logo = styled(Image)`
  margin-top: 65%;
`;

export const Text = styled(TextRN)`
  font-size: 21px;
  font-weight: 700;
  color: #001228;
  line-height: 27px;
  max-width: 85%;
  text-align: center;
  margin-bottom: 32px;
`;

export const ContentBottom = styled(View)`
  position: absolute;
  bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
