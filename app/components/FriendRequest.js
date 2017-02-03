'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class FriendRequest extends Component {
  render() { return (
    <View style={[base.padFullHorizontal, base.padMainItem, styles.box]}>
      <Image style={[styles.image]} source={{uri: this.props.friend.avatar_url}}/>
      <View style={styles.right}>
        <Text>{this.props.friend.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: base.colors.color2}]} onPress={this.accept.bind(this)}>
            <Text style={styles.confirm}>confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: base.colors.lightgrey}]} onPress={this.deny.bind(this)}>
            <Text style={styles.nah}>nah</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}

  accept() {
    alert('accept');
  }

  deny() {
    alert('deny');
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
  },

  image: {
    width: 63,
    height: 63,
    marginRight: 15,
    borderColor: base.colors.lightgrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },

  right: {
    flex: 1,
  },

  button: {
    width: 104,
    height: 31,
    marginRight: 4,
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },

  confirm: {
    color: 'white',
    fontSize: base.fontSizes.small,
  },

  nah: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.small
  },
})
