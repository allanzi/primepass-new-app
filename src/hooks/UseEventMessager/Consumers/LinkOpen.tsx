import {Config} from '..';
import {Linking} from 'react-native';

export const invoke = (data: Object, _config: Config) => {
  if (!data.url) {
    return;
  }

  Linking.openURL(data.url);
};
