import React from 'react';

import {UseEventMessagerProvider} from './UseEventMessager';

interface ProviderProps {
  children: React.ReactNode;
}

const providers = [UseEventMessagerProvider];

const compose = (
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ...providers: Array<React.FC<ProviderProps>>
): React.FC<ProviderProps> => {
  return providers.reduce((Prev, Curr) => ({children}: ProviderProps) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));
};

const AppProvider = compose(...providers);

export default AppProvider;
