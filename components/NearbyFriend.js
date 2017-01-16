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

export default class NearbyFriend extends Component {
  constructor(props) {
    super(props);
  }

  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} activeOpacity={1} onPress={this.props.toggle} accessible={true} accessibilityLabel={`Select ${this.props.friend.name}`}>
        <Image style={[base.photoCircle]} source={{uri: this.props.friend.avatar_url}}/>
        <Text style={[styles.main, {marginRight: 10}]}>{this.props.friend.name}</Text>
        { this.props.friend.selected ?
          <Image source={require('../images/Checked.png')} />
        :
          <Image source={require('../images/EmptyCircle.png')} />
        }
      </TouchableOpacity>
    </View>
  )}
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
