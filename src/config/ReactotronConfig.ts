import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Primepass',
  })
  .useReactNative({overlay: false})
  .connect(); // let's connect!
