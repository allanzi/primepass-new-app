import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Redeem: React.FC = () => {
  return (
    <Container>
      <Webview uri="/redeem?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Redeem;
