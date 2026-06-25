import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import TransferScreen from '../screens/TransferScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          headerShown: true,
          headerTitle: 'Transactions',
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          headerShown: true,
          headerTitle: 'Send Money',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
