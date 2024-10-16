import * as React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';

import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
  label?: string | any;
  outline?: boolean;
  loading?: boolean;
  onPress?: () => {} | void;
}

const Button: React.FC<ButtonProps> = ({loading, label, outline, onPress}) => {
  return (
    <S.Button onPress={onPress} outline={outline}>
      {loading ? (
        <ActivityIndicator size="small" color={outline ? '#2DACE3' : '#FFF'} />
      ) : (
        <S.ButtonText outline={outline}>{label}</S.ButtonText>
      )}
    </S.Button>
  );
};

export default Button;
