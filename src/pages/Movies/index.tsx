import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Movies: React.FC = () => {
  return (
    <Container>
      <Webview uri="/movies?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Movies;
