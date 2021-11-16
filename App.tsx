import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './src/services/api';
import { ContactList } from './src/views/contact-list';

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContactList />
      </QueryClientProvider>
      <StatusBar style="auto" />
    </>
  );
}
