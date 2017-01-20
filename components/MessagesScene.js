'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import TabBar from './TabBar';
import api from '../services/api';
import {
  AsyncStorage,
  View,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class MessagesScene extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);

    const ws = new WebSocket('ws://192.168.1.72:3001');

    ws.onopen = () => {
      // connection opened
      ws.send('something'); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.warn('received message', e.data);
      this.appendMessage(e.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.warn(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.warn(e.code, e.reason);
    };
  }

  appendMessage(message) {
    try {
      message = JSON.parse(message);
    } catch(err) {
      return console.warn("Couldn't parse", message, err);
    }

    AsyncStorage.getItem('@floats:user', (user) => {
      message = {
        _id: message.id,
        text: message.text,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.user.id,
          name: message.user.name,
          avatar: message.user.avatar_url,
        }
      }

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, [message])
        }
      })
    })
  }

  onSend(messages = []) {
    messages.forEach(function(m) {
      console.log("gonna create", m.text);
      api.messages.create(m.text).catch(function(err) {
        console.error(err);
        // FIXME: show message as failed
      });
    })

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
        <TabBar />
      </View>
    );
  }
}
