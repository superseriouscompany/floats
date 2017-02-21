'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  send
} from '../actions/friendRequests.js'
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

      <Text style={[styles.main, {marginRight: 10}]}>{this.props.friend.name}
        { this.state.sent ?
          <Text style={styles.desc}>
            {"\n"}{"friend request sent"}
          </Text>
        :
          <Text style={styles.desc}>
            {"\n"}{"send friend request?"}
          </Text>
        }
      </Text>

      { this.state.sending ?
        <ActivityIndicator
          style={base.buttonLoader}
          size="small"
          color={base.colors.mediumgrey}
        />
      : this.state.sent?
        <TouchableOpacity onPress={this.undoFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Undo friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/SuccessCheck.png')} />
        </TouchableOpacity>
      : this.state.failed ?
        <TouchableOpacity onPress={this.sendFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Send friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/FailureExclamation.png')} />
        </TouchableOpacity>
      :
        <TouchableOpacity onPress={this.sendFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Send friend request to ${this.props.friend.name}`}>
          <Image source={require('../images/AddFriendButton.png')} />
        </TouchableOpacity>
      }
    </View>
  )}

  sendFriendRequest() {
    this.setState({sending: true});
    api.friendRequests.create(this.props.friend.id).then(() => {
      this.setState({sent: true, sending: false});
    }).catch(() => {
      this.setState({failed: true});
    });
  }

  undoFriendRequest() {
    this.setState({sending: true});
    api.friendRequests.undo(this.props.friend.id).then(() => {
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
  desc: {
    color: base.colors.mediumlightgrey,
    fontSize: base.fontSizes.small,
  },
});
