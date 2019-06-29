import React from 'react';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { Button, Icon, Text } from 'react-native-elements';
import { HeaderRight, Header } from 'layouts';
import Video from './Video';
import Feed from './Feed';
import Search from './Search';
import BitchuteSubscriptions from './BitchuteSubscriptions';
import BitchuteChannelView from './BitchuteChannelView';
import Test from './Test';
// import Logouts from "./Logouts";BitchuteChannelView
import { BitchuteLogin, Logouts } from './logins';

const INITIAL_ROUTE = 'Feed';

export default createStackNavigator(
  {
    Feed,
    Video,
    Logouts,
    BitchuteLogin,
    Search,
    BitchuteSubscriptions,
    BitchuteChannelView,
    Test,
  },
  {
    initialRouteName: INITIAL_ROUTE,
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} initialRoute={INITIAL_ROUTE} />,
    }),
    /* defaultNavigationOptions: ({ navigation }) => ({
      headerRight: <HeaderRight navigation={navigation} />,
    }), */
  },
);
