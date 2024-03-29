import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Drawer, Header } from 'layouts';

import Main from './Main';

const drawerNAvigation = createDrawerNavigator(
  {
    Main,
  },
  {
    contentComponent: Drawer,
  },
);

export default createAppContainer(drawerNAvigation);
