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
    <View style={[base.padFullHorizontal, base.padMainItem, styles.box]}>
      <Image style={[styles.image]} source={{uri: this.props.friend.avatar_url}}/>
      <View style={styles.right}>
        <Text>{this.props.friend.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.button, styles.confirm]}>confirm</Text>
          <Text style={[styles.button, styles.nah]}>nah</Text>
        </View>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },

  right: {
    flex: 1,
  },

  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: base.fontSizes.small,
  },

  confirm: {
    backgroundColor: 'mediumaquamarine',
    color: 'white',
  },

  nah: {
    backgroundColor: base.colors.lightgrey
  },
})
