import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ThemeProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';

import { lightTheme } from './theme';
import AppStack from './navigation/AppStack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
