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
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class MessagesScene extends Component {
  constructor(props) {
    super(props);
    this.onSend       = this.onSend.bind(this);
    this.state        = {};
    this.renderBubble = this.renderBubble.bind(this);
    this.onSend       = this.onSend.bind(this);
  }

  onSend(messages = []) {
    this.props.send(messages[0]);
  }

  render() {
    if( !this.props.user ) return null;

    return (
      <View style={base.screen}>
        <View style={base.header}>
          <TouchableOpacity onPress={this.props.back.bind(this)} style={[base.leftNav, styles.leftNavButton]}>
            <Image source={require('../images/SmallLeftArrow.png')} />
          </TouchableOpacity>
          <View style={base.header}>
            <Heading>{this.props.name}</Heading>
          </View>
          <TouchableOpacity onPress={() => this.showOptions()} style={[base.rightNav, styles.rightNavButton]}>
            <Image source={require('../images/Ellipses.png')} />
          </TouchableOpacity>
        </View>

        <GiftedChat
          messages={this.props.messages}
          onSend={this.onSend}
          renderBubble={this.renderBubble}
          user={{
            _id: this.props.user.id,
          }}
        />
      </View>
    )
  }

  renderBubble(props) { return(
    <View>
      { props.position == 'left' ?
        <Text style={styles.name}>{props.currentMessage.user.name.split(' ')[0]}</Text>
      : null
      }
      <Bubble
        {...props}
        containerToNextStyle={{
          left: {
            borderBottomLeftRadius: 15,
          },
          right: {
            borderBottomRightRadius: 15,
          },
        }}
        containerToPreviousStyle={{
          left: {
            borderTopLeftRadius: 15,
          },
          right: {
            borderTopRightRadius: 15,
          },
        }}
        />
    </View>
  )}

  showOptions() {
    alert('not implemented');
  }
}

MessagesScene.propTypes = {
  send: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  name: {
    color: 'hotpink',
    fontSize: base.fontSizes.small,
  },
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
