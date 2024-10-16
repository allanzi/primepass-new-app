/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useRef} from 'react';
import {TextInputProps} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import * as S from './styles';

interface CodeProps extends TextInputProps {
  errorMessage: string;
  value?: string;
  onTextChange(code: string): void;
}

const ValidationCode: React.FC<CodeProps> = ({errorMessage, ...props}) => {
  const inputRef = useRef(null);

  return (
    <S.Content>
      <SmoothPinCodeInput
        {...props}
        codeLength={6}
        ref={inputRef}
        cellStyle={{
          borderWidth: 2,
          borderRadius: 8,
          borderColor: errorMessage?.length > 0 ? '#ff0000' : '#e9e9e9',
          margin: 10,
        }}
        cellSpacing={10}
        cellStyleFocused={{
          borderColor: '#2dace3',
        }}
        textStyle={{
          fontSize: 24,
          color: '#505050',
        }}
        textStyleFocused={{
          color: '#505050',
        }}
        keyboardType="numeric"
        animationFocused={null}
      />

      {errorMessage?.length > 0 && <S.Error>{errorMessage}</S.Error>}
    </S.Content>
  );
};

export default ValidationCode;
