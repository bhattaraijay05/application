import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
const Tabs = AnimatedTabBarNavigator();

import colors from '../config/colors';
import Rooms from '../Rooms';
import ChatPage from '../ChatPage';
import ChatStack from './ChatStack';
const BottomNav = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.activeTintColor,
        inactiveTintColor: colors.inactiveTintColor,
        activeBackgroundColor: colors.activeBackgroundColor,
        style: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="Home"
        component={ChatStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Second"
        component={Rooms}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
