import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Plans: React.FC = () => {
  return (
    <Container>
      <Webview uri="/plans?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Plans;
