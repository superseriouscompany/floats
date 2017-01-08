'use strict';

import React, {Component} from 'react';

import {
  View
} from 'react-native';

import AppText from './AppText';

const base = require('../styles/base');

export default class Heading extends Component {
  render() { return (
    <View style={base.textHeader}>
      <AppText style={{fontSize: 14}}>{this.props.children}</AppText>
    </View>
  )}
}
