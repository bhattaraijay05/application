import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

const Rooms = ({navigation}) => {
  var rooms = ['education', 'entertainment', 'movies', 'music', 'random'];

  const RoomItems = () => (
    <>
      {rooms.map((room, index) => (
        <RectButton
          onPress={() => {
            navigation.navigate('Chat', (room = room));
          }}
          key={index}
          room={room}
          style={styles.room}>
          <View accessible>
            <Text style={styles.roomText}>{room.toUpperCase()}</Text>
          </View>
        </RectButton>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Chat Room</Text>
      <RoomItems />

      <Text style={styles.title}>Two People Chat Room</Text>
      <RoomItems />
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    padding: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  room: {
    marginHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#75cfb8',
    marginVertical: 2,
  },
  roomText: {
    fontSize: 25,
    padding: 10,
    marginLeft: 10,
  },
});
