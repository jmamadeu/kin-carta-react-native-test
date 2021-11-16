import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ContactList } from '../src/views/contact-list';
import { ContactProfile } from '../src/views/contact-profile';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen
        name="Contacts"
        options={{
          headerShown: false
        }}
        component={ContactList}
      />
      <Stack.Screen name="Contact" component={ContactProfile} />
    </Stack.Navigator>
  );
}
