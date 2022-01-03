import React, { useContext, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import MainTabs from '../MainTabs';
import { screenNames } from '../screenNames';
import { UserProfile } from '../../screens';
import PostsList from '../../screens/PostsList/Posts';
import { ProductsList } from '../../screens/PaymentForm';
import LoginContext from '../../contexts/LoginContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const { navigate } = useNavigation();
  const { removeItem, getItem } = useAsyncStorage('username');
  const { username, setUsername } = useContext(LoginContext);

  const removeUsername = async () => {
    try {
      setUsername('');
      await AsyncStorage.removeItem('username').then(() => {
        navigate(screenNames.Profile);
      });
    } catch (e) {}
    console.log('Done');
  };

  const Logout = () => {
    removeUsername();
  };

  console.log(username);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={Logout} />
      </DrawerContentScrollView>
    );
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={username ? screenNames.PostsList : screenNames.Profile}>
      {username ? (
        <>
          <Drawer.Screen name="MainTabs" component={MainTabs} />
          <Drawer.Screen name={screenNames.PostsList} component={PostsList} />
          <Drawer.Screen
            name={screenNames.ProductsList}
            component={ProductsList}
          />
          <Drawer.Screen name={screenNames.Profile} component={UserProfile} />
        </>
      ) : (
        <>
          <Drawer.Screen name={screenNames.Profile} component={UserProfile} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default MainDrawer;
