import styled from 'styled-components';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text as TextRN,
  View,
} from 'react-native';

export const Keyboard = styled(KeyboardAvoidingView)`
  flex: 1;
`;

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

export const ContentBottom = styled(ScrollView)`
  width: 100%;
  flex: 1;
  padding: 20px;
  margin-bottom: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 16px;
  background-color: #f7f6f7;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  shadow-color: rgba(0, 0, 0, 0.4);
  shadow-opacity: 0.1;
  elevation: 1;
`;

export const Text = styled(TextRN)`
  font-size: 18px;
  font-weight: 700;
  color: #505050;
  margin-bottom: 16px;
`;

export const Form = styled(View)`
  gap: 16px;
`;

export const ContentCode = styled(View)`
  margin-top: 16px;
  display: flex;
`;

export const Link = styled(TouchableOpacity)``;

export const LinkText = styled(TextRN)`
  color: #2dace3;
  font-size: 16px;
  margin-top: 20px;
`;
