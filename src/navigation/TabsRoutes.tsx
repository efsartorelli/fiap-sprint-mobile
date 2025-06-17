import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import History from '../screens/History';
import Statistics from '../screens/Statistics'; // ✅ Importado

import { TabsParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111' },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
          tabBarLabel: 'Dashboard',
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size} />
          ),
          tabBarLabel: 'Histórico',
        }}
      />

      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" color={color} size={size} />
          ),
          tabBarLabel: 'Estatísticas',
        }}
      />
    </Tab.Navigator>
  );
}
