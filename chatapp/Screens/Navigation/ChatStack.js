import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Rooms from '../Rooms';
import ChatPage from '../ChatPage';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

const ChatStack = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Chat') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Home" component={Rooms} />
      <Stack.Screen
        name="Chat"
        component={ChatPage}
        options={{
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
