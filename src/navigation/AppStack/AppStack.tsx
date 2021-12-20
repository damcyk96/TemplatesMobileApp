import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainDrawer from '../MainDrawer';
import { screenNames } from '../screenNames';
import { CreatePost, EditPost, PostPreview, SignIn } from '../../screens';
import {
  PaymentMethod,
  Preview,
  ProductsList,
  Summary,
} from '../../screens/PaymentForm';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="MainDrawer">
    <Stack.Screen
      name="MainDrawer"
      component={MainDrawer}
      options={{ headerShown: false }}
    />
    {/* MAIN STACK */}
    <Stack.Screen name={screenNames.PostPreview} component={PostPreview} />
    <Stack.Screen name={screenNames.SignIn} component={SignIn} />
    <Stack.Screen name={screenNames.CreatePost} component={CreatePost} />
    <Stack.Screen name={screenNames.EditPost} component={EditPost} />
    {/* STACK PAYMENTS */}
    <Stack.Screen name={screenNames.PaymentMethod} component={PaymentMethod} />
    <Stack.Screen name={screenNames.Preview} component={Preview} />
    <Stack.Screen name={screenNames.ProductsList} component={ProductsList} />
    <Stack.Screen name={screenNames.Summary} component={Summary} />
  </Stack.Navigator>
);

export default AppStack;
