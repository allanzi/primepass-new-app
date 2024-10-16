import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {API} from '@PrimePassCinema/prime-connector';
import Routes from './src/routes';
import {store} from './src/store';
import {REACT_APP_API_HOST} from '@env';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

import AppProvider from './src/hooks';

const persistor = persistStore(store);

const App: React.FC = () => {
  API.setupDirect(REACT_APP_API_HOST, '', 'pt-br');

  useEffect(() => SplashScreen.hide(), []);

  return (
    <>
      <StatusBar animated={true} barStyle={'dark-content'} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppProvider>
            <Routes />
          </AppProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
