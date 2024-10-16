import * as React from 'react';
import {useRoute} from '@react-navigation/native';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const CheckIn: React.FC = () => {
  const route = useRoute() as any;

  return (
    <Container>
      <Webview
        uri={`/check-in/${route.params.id}?lng=pt-BR&hideHeader=true&useDeeplink=true`}
      />
    </Container>
  );
};

export default CheckIn;
