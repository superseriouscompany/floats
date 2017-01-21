'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  View,
} from 'react-native';

export default class Inbox extends Component {
  render() { return (
    <View>
      { this.props.inbox.map((x, key) => (
        <Text key={key}>{JSON.stringify(x)}</Text>
      ))}
    </View>
  )}
}
