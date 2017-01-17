'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Rando extends Component {
  constructor(props) {
    super(props);
    this.state = { sent: false }
  }

  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={{uri: this.props.friend.avatar_url}}/>
      <Text style={[styles.main, {marginRight: 10}]}>{this.props.friend.name}</Text>

      { this.state.sending ?
        <ActivityIndicator color="hotpink" />
      : this.state.sent?
        <TouchableOpacity onPress={this.undoFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Undo friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/SuccessCheck.png')} />
        </TouchableOpacity>
      : this.state.failed || Math.random() < 0.5 ?
        <TouchableOpacity onPress={this.sendFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Send friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/AddButton.png')} />
        </TouchableOpacity>
      :
        <TouchableOpacity onPress={this.sendFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Send friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/FailureExclamation.png')} />
        </TouchableOpacity>
      }
    </View>
  )}

  sendFriendRequest() {
    this.setState({sending: true});
    api.friendRequests.send(this.props.friend.id).then(() => {
      this.setState({sent: true, sending: false});
    }).catch(() => {
      this.setState({sendFailed: true});
    });
  }

  undoFriendRequest() {
    this.setState({sending: true});
    api.friendRequests.destroy(this.props.friend.id).then(() => {
      this.setState({sent: false, sending: false});
    }).catch((err) => {
      console.error(err);
      this.setState({sending: false});
    });
  }
}
Rando.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});
