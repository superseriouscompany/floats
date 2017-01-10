'use strict';

import React from 'react';
import Component from './Component';
import AppText from './AppText';
import base from '../styles/base';
import {
  View
} from 'react-native';

export default class Heading extends Component {
  render() { return (
    <View style={base.textHeader}>
      <AppText style={{fontSize: 14}}>{this.props.children}</AppText>
    </View>
  )}
}
