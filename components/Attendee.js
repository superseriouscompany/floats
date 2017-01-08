'use strict';

import React, {Component} from 'react';

import {
  Image,
  View
} from 'react-native';

import AppText from './AppText';

export default class Foo extends Component {
  render() { return (
    <View style={{flexDirection: 'row'}}>
      <Image source={{url: this.props.user.avatar_url}} style={{width: 20, height: 20}} />
      <AppText style={{flex: 1}}>{this.props.user.name}</AppText>
    </View>
  )}
}
