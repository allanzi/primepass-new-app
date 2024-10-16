import {useRoute} from '@react-navigation/native';
import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const PlanCheckout: React.FC = () => {
  const route = useRoute() as any;
  return (
    <Container>
      <Webview
        uri={`/plans/${route.params.id}/checkout?lng=pt-BR&hideHeader=true&useDeeplink=true`}
      />
    </Container>
  );
};

export default PlanCheckout;
