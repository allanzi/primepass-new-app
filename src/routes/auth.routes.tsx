import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator initialRouteName="Welcome">
      <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Auth.Screen
        name="Login"
        component={Signin}
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
      <Auth.Screen
        name="Cadastro"
        component={Signup}
        options={{headerTransparent: true, headerBackTitleVisible: false}}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
