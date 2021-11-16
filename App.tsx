import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Router } from './routes';
import { queryClient } from './src/services/api';

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </>
  );
}
