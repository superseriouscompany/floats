'use strict';

import React, {Component} from 'react';

import {
  TouchableOpacity,
  View
} from 'react-native';

import AppText from './AppText';

export default class ReturnArrow extends Component {
  render() { return (
    <View>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('FriendsScene')}>
        <AppText>&gt;</AppText>
      </TouchableOpacity>
    </View>
  )}
}
