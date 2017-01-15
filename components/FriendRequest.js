'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class FriendRequest extends Component {
  render() { return (
    <View style={[{flexDirection: 'row'}, base.padFullHorizontal]}>
      <Image style={[styles.image]} source={{uri: this.props.friend.avatar_url}}/>
      <View style={styles.right}>
        <Text>{this.props.friend.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.button, styles.confirm]}>confirm</Text>
          <Text style={[styles.button, styles.nah]}>nah</Text>
        </View>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },

  right: {
    flex: 1,
  },

  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },

  confirm: {
    backgroundColor: 'mediumaquamarine',
    color: 'white',
  },

  nah: {
    backgroundColor: base.colors.lightgrey
  },
})
