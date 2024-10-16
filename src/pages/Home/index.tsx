import * as React from 'react';

import {useAppSelector} from '../../store/hooks';
import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Home: React.FC = () => {
  const {
    auth,
    user: {id},
  } = useAppSelector(state => state.user);

  return (
    <Container>
      <Webview
        uri={`/force-login?lng=pt-BR&hideHeader=true&useDeeplink=true&token=${auth.token}&userId=${id}&next=/dashboard`}
      />
    </Container>
  );
};

export default Home;
