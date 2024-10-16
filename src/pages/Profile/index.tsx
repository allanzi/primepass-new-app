import * as React from 'react';

import Webview from '../../components/Webview';
import Container from '../../components/Container';

const Profile: React.FC = () => {
  return (
    <Container>
      <Webview uri="/profile?lng=pt-BR&hideHeader=true&useDeeplink=true" />
    </Container>
  );
};

export default Profile;
