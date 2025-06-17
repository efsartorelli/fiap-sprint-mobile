import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AddTransaction from '../screens/AddTransaction';
import Suggestions from '../screens/Suggestions';
import TabsRoutes from './TabsRoutes';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeTabs" component={TabsRoutes} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen name="Suggestions" component={Suggestions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
