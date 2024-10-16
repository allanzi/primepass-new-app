import * as React from 'react';
import {useRoute} from '@react-navigation/native';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Transactions: React.FC = () => {
  const route = useRoute() as any;

  return (
    <Container>
      <Webview
        uri={`/transactions/${route.params.id}?lng=pt-BR&hideHeader=true&useDeeplink=true`}
      />
    </Container>
  );
};

export default Transactions;
