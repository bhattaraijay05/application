import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ChatPage from './Screens/ChatPage';
import BottomNav from './Screens/Navigation/BottomNav';

const App = () => {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
