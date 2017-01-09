'use strict';

import React, {Component} from 'react';

import {
  View
} from 'react-native';

import AppText from './AppText';

export default class FriendsCount extends Component {
  render() { return (
    <View style={{paddingLeft: 7}}>
      <AppText>{this.props.count} friends are around</AppText>
    </View>
  )}
}
