import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import ListsScreen from '../pages/ListsScreen';
import ProfileScreen from '../pages/ProfileScreen';
import DonateScreen from '../pages/DonateScreen';


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Lists"
      screenOptions={{
        tabBarActiveTintColor: '#698834',
      }}
    >
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          tabBarLabel: 'Lists',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checkbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="charity" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;