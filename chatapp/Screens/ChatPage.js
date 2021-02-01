import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import io from 'socket.io-client';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ENDPOINT = 'http://192.168.137.1:3000';

var socket;

const ChatPage = ({props, route, navigation}) => {
  const room = route.params;
  const [id, setId] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const giftedChatRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({title: room.toUpperCase()});

    socket = io(ENDPOINT);
    socket.on('connect', () => {
      setId(socket.id);
    });
  }, []);

  const endCall = () => {
    socket.emit('endcall');
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={endCall} style={{marginLeft: 20}}>
          <Icon name="corner-up-left" size={28} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const _onSend = async (message = []) => {
    const newMessages = await GiftedChat.append(chatMessages, message);
    socket.on('getchat', (newMessages) => {
      setChatMessages(newMessages);
    });
    socket.emit('setchat', newMessages);
    giftedChatRef.current.scrollToBottom();
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'dodgerblue',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Icon name="send" size={32} color="dodgerblue" />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      {...props}
      messages={chatMessages}
      onSend={(msg) => _onSend(msg)}
      user={{
        _id: id,
      }}
      placeholder="Type your message here..."
      alwaysShowSend
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      listViewProps={{
        style: {
          backgroundColor: 'white',
        },
      }}
      ref={giftedChatRef}
    />
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
