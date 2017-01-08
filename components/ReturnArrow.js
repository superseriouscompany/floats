'use strict';

import React, {Component} from 'react';

import {
  View
} from 'react-native';

import AppText from './AppText';

export default class ReturnArrow extends Component {
  render() { return (
    <View>
      <AppText>&gt;</AppText>
    </View>
  )}
}
