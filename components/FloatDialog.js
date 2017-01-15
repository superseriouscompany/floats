'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  View,
} from 'react-native';

export default class FloatDialog extends Component {
  render() { return (
    <View>
      { this.props.friends.map((f, i) => (
        <Text key={i}>{f.name}</Text>
      ))}
    </View>
  )}
}
