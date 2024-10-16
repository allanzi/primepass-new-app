import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Wallet: React.FC = () => {
  return (
    <Container>
      <Webview uri="/wallet?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Wallet;
