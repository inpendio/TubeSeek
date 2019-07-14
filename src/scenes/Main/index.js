import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Header } from 'components';
import Video from './Video';
import Feed from './Feed';
import Search from './Search';
import Subscriptions from './Subscriptions';
import ChannelView from './ChannelView';
import Test from './Test';
import { BitchuteLogin, Logouts } from './logins';
import Queue from './Queue';

const INITIAL_ROUTE = 'Feed';

export default createStackNavigator(
  {
    Feed,
    Video,
    Logouts,
    BitchuteLogin,
    Search,
    Subscriptions,
    ChannelView,
    Test,
    Queue,
  },
  {
    initialRouteName: INITIAL_ROUTE,
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} initialRoute={INITIAL_ROUTE} />,
    }),
  },
);
