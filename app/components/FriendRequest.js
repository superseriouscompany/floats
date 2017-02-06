'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class FriendRequest extends Component {
  render() { console.log("YO " + this.props.friend.avatar_url);
  return (
    <View style={[base.padFullHorizontal, base.padMainItem, styles.box]}>
      <Image style={[styles.image]} source={{uri: this.props.friend.avatar_url}}/>
      { true ?
        <ActivityIndicator
          style={[base.buttonLoader, {height: 63, width: 63}]}
          size="small"
          color={base.colors.mediumgrey}
        />
      :
        <View style={styles.right}>
          <Text>{this.props.friend.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.button, {backgroundColor: base.colors.color2}]} onPress={() => this.props.accept(this.props.friend.id)}>
              <Text style={styles.confirm}>confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: base.colors.lightgrey}]} onPress={() => this.props.deny(this.props.friend.id)}>
              <Text style={styles.nah}>nah</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )}

  accept() {
    alert('accept');
  }

  deny() {
    alert('deny');
  }
}

FriendRequest.propTypes = {
  accept: React.PropTypes.func.isRequired,
  deny:   React.PropTypes.func.isRequired,
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
