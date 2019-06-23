import React from 'react';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { Button, Icon, Text } from 'react-native-elements';
import { HeaderRight } from 'layouts';
import Video from './Video';
import Feed from './Feed';
// import Logouts from "./Logouts";
import { BitchuteLogin, Logouts } from './logins';

export default createStackNavigator(
  {
    Feed,
    Video,
    Logouts,
    BitchuteLogin,
  },
  {
    initialRouteName: 'Feed',
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: <HeaderRight navigation={navigation} />,
    }),
  },
);
