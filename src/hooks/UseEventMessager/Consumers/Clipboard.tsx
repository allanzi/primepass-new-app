import {Config} from '..';
import Clipboard from '@react-native-clipboard/clipboard';

export const invoke = (data: string, _config: Config) => {
  if (!data) {
    return;
  }

  Clipboard.setString(data);
};
