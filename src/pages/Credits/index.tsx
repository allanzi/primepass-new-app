import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Credits: React.FC = () => {
  return (
    <Container>
      <Webview uri="/credits?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Credits;
