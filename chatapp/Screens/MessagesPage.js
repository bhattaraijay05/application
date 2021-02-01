import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MessagesPage = ({message, senderId, recieverId}) => {
  return (
    <View>
      {senderId === recieverId ? (
        <View style={{backgroundColor: 'red'}}>
          <Text>
            {message} by {senderId}
          </Text>
        </View>
      ) : (
        <View style={{backgroundColor: 'blue'}}>
          <Text>
            {message} by {senderId}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessagesPage;

const styles = StyleSheet.create({});
