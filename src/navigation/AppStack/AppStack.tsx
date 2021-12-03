import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainDrawer from '../MainDrawer';
import { screenNames } from '../screenNames';
import { CreatePost, EditPost, PostPreview, SignIn } from '../../screens';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="MainDrawer">
    <Stack.Screen
      name="MainDrawer"
      component={MainDrawer}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={screenNames.PostPreview} component={PostPreview} />
    <Stack.Screen name={screenNames.SignIn} component={SignIn} />
    <Stack.Screen name={screenNames.CreatePost} component={CreatePost} />
    <Stack.Screen name={screenNames.EditPost} component={EditPost} />
  </Stack.Navigator>
);

export default AppStack;
