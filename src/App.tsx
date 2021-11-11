import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './navigation/AppStack';

const App = () => (
  <NavigationContainer>
    <AppStack />
  </NavigationContainer>
);

export default App;
