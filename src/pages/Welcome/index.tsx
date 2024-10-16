import * as React from 'react';
import {Platform} from 'react-native';

import LogoDark from '../../assets/logoDark.webp';
import Button from '../../components/Button';
import * as S from './styles';

const Welcome: React.FC = ({navigation}: any) => {
  const background = {
    uri: 'https://primepass-imagens.s3.us-east-1.amazonaws.com/site-novo/welcome-background-mobile-light.webp',
  };

  return (
    <S.Background source={background}>
      <S.Logo source={LogoDark} />

      <S.ContentBottom>
        <S.Text>Preparado pra sua nova carteira digital de conteúdos?</S.Text>

        {Platform.OS !== 'ios' && (
          <Button
            label="Criar minha conta"
            onPress={() => navigation.navigate('Auth', {screen: 'Cadastro'})}
          />
        )}
        <Button
          label="Entrar"
          outline
          onPress={() => navigation.navigate('Auth', {screen: 'Login'})}
        />
      </S.ContentBottom>
    </S.Background>
  );
};

export default Welcome;
