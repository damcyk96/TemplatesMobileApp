import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Posts, Settings } from '../../screens';
import { screenNames } from '../screenNames';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (screenNames.Settings) {
          iconName = 'ios-information-circle';
        } else if (screenNames.PostPreview) {
          iconName = 'ios-list-box';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen
      name={screenNames.Posts}
      component={Posts}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name={screenNames.Settings}
      component={Settings}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default MainTabs;
