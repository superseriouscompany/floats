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
    this.onSend = this.onSend.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  onSend(messages = []) {
    this.props.send(messages[0]);
  }

  render() {
    if( !this.state.user ) return null;

    return (
      <View style={base.screen}>
        <View style={base.header}>
          <TouchableOpacity onPress={this.props.back.bind(this)} style={[base.leftNav, styles.leftNavButton]}>
            <Image source={require('../images/SmallLeftArrow.png')} />
          </TouchableOpacity>
          <View style={base.header}>
            <Heading>{this.state.name}</Heading>
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

  showOptions() {
    alert('not implemented');
  }
}

MessagesScene.propTypes = {
  send: React.PropTypes.func.isRequired,
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
