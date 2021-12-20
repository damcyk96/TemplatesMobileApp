import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabs from '../MainTabs';
import { screenNames } from '../screenNames';
import { UserProfile } from '../../screens';
import PostsList from '../../screens/PostsList/Posts';

const Drawer = createDrawerNavigator();

const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="MainTabs" component={MainTabs} />
    <Drawer.Screen name={screenNames.Profile} component={UserProfile} />
    <Drawer.Screen name={screenNames.PostsList} component={PostsList} />
  </Drawer.Navigator>
);

export default MainDrawer;
