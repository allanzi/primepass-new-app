import * as React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TextInputProps} from 'react-native';

import * as S from './styles';

interface InputProps extends TextInputProps {
  errorMessage: string;
}

const Input: React.FC<InputProps> = ({errorMessage, ...props}) => {
  const [borderColor, setBorderColor] = useState('#e9e9e9');

  useEffect(() => {
    if (errorMessage?.length > 0) {
      setBorderColor('#ff0000');
      return;
    }
    setBorderColor('#e9e9e9');
  }, [errorMessage]);

  const customOnFocus = () => {
    if (errorMessage?.length === 0) {
      props?.onFocus;
      setBorderColor('#2dace3');
    }
  };

  const customOnBlur = () => {
    if (errorMessage?.length === 0) {
      props?.onBlur;
      setBorderColor('#e9e9e9');
    }
  };

  return (
    <S.Content>
      <S.Input
        {...props}
        style={{borderColor}}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
      />
      {errorMessage?.length > 0 && <S.Error>{errorMessage}</S.Error>}
    </S.Content>
  );
};

export default Input;
