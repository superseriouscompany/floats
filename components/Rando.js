'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import Text from './Text';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
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
      <TouchableOpacity onPress={this.sendFriendRequest.bind(this)} accessible={true} accessibilityLabel={`Send friend request to ${this.props.friend.name}`}>
        { this.state.sent ?

          <Image source={require('../images/Checked.png')} />
        :
          <Image source={require('../images/Unchecked.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  sendFriendRequest() {
    this.context.store.dispatch({type: 'sendFriendRequest', id: this.props.friend.id});
  }

  undoFriendRequest() {
    this.context.store.dispatch({type: 'undoFriendRequest', id: this.props.friend.id});
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
