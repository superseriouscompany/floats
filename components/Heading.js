'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  View
} from 'react-native';

export default class Heading extends Component {
  render() { return (
    <View style={base.textHeader}>
      <Text style={{fontSize: 14}}>{this.props.children}</Text>
    </View>
  )}
}
