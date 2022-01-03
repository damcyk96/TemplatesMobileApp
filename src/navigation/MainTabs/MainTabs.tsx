import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Posts, Settings } from '../../screens';
import { screenNames } from '../screenNames';

const Tab = createBottomTabNavigator();

const iconNames = {
  [screenNames.Posts]: 'ios-list',
  [screenNames.Map]: 'ios-map',
  [screenNames.Settings]: 'ios-settings',
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName = Object.entries(iconNames).find(
          (icon) => icon[0] === route.name,
        );

        return (
          <Ionicons
            name={iconName ? iconName[1] : 'ios-help'}
            size={size}
            color={color}
          />
        );
      },
    })}>
    <Tab.Screen
      name={screenNames.Posts}
      component={Posts}
      options={{
        headerShown: false,
      }}
    />
    {/* <Tab.Screen
      name={screenNames.Map}
      component={Map}
      options={{ headerShown: false }}
    /> */}
    <Tab.Screen
      name={screenNames.Settings}
      component={Settings}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default MainTabs;
