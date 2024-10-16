import * as React from 'react';
import {useRoute} from '@react-navigation/native';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const RedeemWallet: React.FC = () => {
  const route = useRoute() as any;
  return (
    <Container>
      <Webview
        uri={`/redeem-wallet/${route.params.code}?lng=pt-BR&hideHeader=true&useDeeplink=true`}
      />
    </Container>
  );
};

export default RedeemWallet;
