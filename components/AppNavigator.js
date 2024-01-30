import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from './feed/FeedScreen';
import SearchScreen from './search/SearchScreen';
import ProfileScreen from './profile/ProfileScreen';
import LoginScreen from './LoginScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  const userLoggedIn = false;

  return (
    <NavigationContainer>
    {userLoggedIn ? (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can add more icons for additional tabs

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;