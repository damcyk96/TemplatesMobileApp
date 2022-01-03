import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ThemeProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { lightTheme } from './theme';
import AppStack from './navigation/AppStack';
import { LastPostWrapper } from './contexts/LastPostContext';
import { TripOrderWrapper } from './contexts/TripsContext';
import { LoginWrapper } from './contexts/LoginContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TripOrderWrapper>
      <LastPostWrapper>
        <LoginWrapper>
          <ThemeProvider theme={lightTheme}>
            <SafeAreaProvider>
              <NavigationContainer>
                <AppStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </ThemeProvider>
        </LoginWrapper>
      </LastPostWrapper>
    </TripOrderWrapper>
  </QueryClientProvider>
);

export default App;
