/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeIcon from '../assets/icon/home.svg';
import HomeIconFocused from '../assets/icon/home-focused.svg';
import WalletIcon from '../assets/icon/wallet.svg';
import WalletIconFocused from '../assets/icon/wallet-focused.svg';
import CreditIcon from '../assets/icon/credit.svg';
import CreditIconFocused from '../assets/icon/credit-focused.svg';
import RedeemIcon from '../assets/icon/redeem.svg';
import RedeemIconFocused from '../assets/icon/redeem-focused.svg';
import MarketplaceIcon from '../assets/icon/marketplace.svg';
import MarketplaceIconFocused from '../assets/icon/marketplace-focused.svg';
import Home from '../pages/Home';
import Wallet from '../pages/Wallet';
import AuthRoutes from './auth.routes';
import Redeem from '../pages/Redeem';
import Plans from '../pages/Plans';
import PlanCheckout from '../pages/PlanCheckout';
import PlanCheckoutSuccess from '../pages/PlanCheckoutSuccess';
import Profile from '../pages/Profile';
import Credits from '../pages/Credits';
import Movies from '../pages/Movies';
import Transactions from '../pages/Transactions';
import CheckIn from '../pages/CheckIn';
import RedeemWallet from '../pages/RedeemWallet';
import RedeemServices from '../pages/RedeemServices';
import {useAppSelector} from '../store/hooks';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{tabBarActiveTintColor: 'rgb(45, 172, 227)'}}
    initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        title: 'Início',
        tabBarIcon: ({size, focused}) => {
          return focused ? (
            <HomeIconFocused width={size} height={size} />
          ) : (
            <HomeIcon width={size} height={size} />
          );
        },
      }}
    />
    <Tab.Screen
      name="Wallet"
      component={Wallet}
      options={{
        headerShown: false,
        title: 'Carteira',
        tabBarIcon: ({size, focused}) => {
          return focused ? (
            <WalletIconFocused width={size} height={size} />
          ) : (
            <WalletIcon width={size} height={size} />
          );
        },
      }}
    />
    <Tab.Screen
      name="Credits"
      component={Credits}
      options={{
        headerShown: false,
        title: 'Cinema',
        tabBarIcon: ({size, focused}) => {
          return focused ? (
            <CreditIconFocused width={size} height={size} />
          ) : (
            <CreditIcon width={size} height={size} />
          );
        },
      }}
    />

    {Platform.OS !== 'ios' && (
      <>
        <Tab.Screen
          name="Redeem"
          component={Redeem}
          options={{
            headerShown: false,
            title: 'Resgate',
            tabBarIcon: ({size, focused}) => {
              return focused ? (
                <RedeemIconFocused width={size} height={size} />
              ) : (
                <RedeemIcon width={size} height={size} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Plans"
          component={Plans}
          options={{
            headerShown: false,
            title: 'Planos',
            tabBarIcon: ({size, focused}) => {
              return focused ? (
                <MarketplaceIconFocused width={size} height={size} />
              ) : (
                <MarketplaceIcon width={size} height={size} />
              );
            },
          }}
        />
      </>
    )}
  </Tab.Navigator>
);

const AppRoutes: React.FC = () => {
  const {auth} = useAppSelector(state => state.user);

  const linking = {
    prefixes: ['primepinteractive://'],
    config: {
      screens: {
        Profile: 'profile',
        CheckIn: 'check-in/:id',
        Transactions: 'transactions/:id',
        Movies: 'movies',
        RedeemWallet: 'redeem-wallet/:code',
        RedeemServices: 'redeem-services/:code',
        PlanCheckout: 'plans/:id/checkout',
        PlanCheckoutSuccess: 'plans/:id/checkout/success',
        BottomTabs: {
          screens: {
            Home: 'dashboard',
            Plans: 'plans',
            Redeem: 'redeem',
            Wallet: 'wallet',
            Credits: 'credits',
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!auth.token ? (
          <Stack.Screen
            name="Auth"
            component={AuthRoutes}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Auth"
              component={AuthRoutes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Movies"
              component={Movies}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Transactions"
              component={Transactions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CheckIn"
              component={CheckIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RedeemWallet"
              component={RedeemWallet}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RedeemServices"
              component={RedeemServices}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlanCheckout"
              component={PlanCheckout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlanCheckoutSuccess"
              component={PlanCheckoutSuccess}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
