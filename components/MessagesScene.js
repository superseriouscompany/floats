'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import Heading from './Heading';
import Text from './Text';
import TabBar from './TabBar';
import api from '../services/api';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class MessagesScene extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
    console.log('called constructor');
  }

  componentWillMount() {
    console.log('called will mount');
    this.unsubscribe = this.context.store.subscribe(this.applyState.bind(this));
    this.applyState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  applyState() {
    const state = this.context.store.getState();

    const messages = state.messages[state.activeConvoId];
    if( !messages ) { return; }
    this.setState({
      loading:  messages.loading,
      error:    messages.error,
      messages: (messages.all || []).map(decorate),
      user:     state.user,
    })
  }

  appendMessage(message) {
    try {
      message = JSON.parse(message);
    } catch(err) {
      return console.warn("Couldn't parse", message, err);
    }

    message = decorate(message);

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, [message])
      }
    })
  }

  onSend(messages = []) {
    const state = this.context.store.getState();
    const convo = state.convos.all && state.convos.all.find(function(c) {
      return c.id == state.activeConvoId;
    });
    console.log("Looking for active convo", state);
    if( !convo ) { return console.error("Active convo doesn't exist"); }

    messages.forEach(function(m) {
      api.messages.create(convo.float_id, convo.id, m.text).catch(function(err) {
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
    if( !this.state.user ) return null;

    return (
      <View style={base.screen}>
        <View style={base.header}>
          <TouchableOpacity onPress={this.back.bind(this)} style={[base.leftNav, styles.leftNavButton]}>
            <Image source={require('../images/SmallLeftArrow.png')} />
          </TouchableOpacity>
          <View style={base.header}>
            <Heading>Kevin David Crowe</Heading>
          </View>
          <TouchableOpacity onPress={() => this.showOptions()} style={[base.rightNav, styles.rightNavButton]}>
            <Image source={require('../images/Ellipses.png')} />
          </TouchableOpacity>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: this.state.user.id,
          }}
        />
      </View>
    )
  }

  back() {
    this.context.store.dispatch({type: 'navigation:queue', route: 'FloatsScene'});
  }

  showOptions() {
    alert('not implemented');
  }
}

const styles = StyleSheet.create({
  leftNavButton: {
    paddingTop: 21,
    paddingBottom: 17,
    paddingLeft: 19,
    paddingRight: 14
  },
  rightNavButton: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 14,
    paddingRight: 19
  }
});

function decorate(message) {
  return {
    _id: message.id,
    text: message.text,
    createdAt: new Date(message.created_at),
    user: {
      _id: message.user.id,
      name: message.user.name,
      avatar: message.user.avatar_url,
    }
  }
}

MessagesScene.contextTypes = {
  store: React.PropTypes.object,
}
