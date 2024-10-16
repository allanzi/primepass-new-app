import {logout} from '../../../store/features/user/userSlice';
import {Config} from '..';

export const invoke = (_data: Object, config: Config) => {
  config.dispatch(logout());
  config.navigation.navigate('Auth', {screen: 'Welcome'});
  config.navigation.reset({index: 1, routes: [{name: 'Auth'}]});
};
