'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Float from './Float';

import {
  View,
} from 'react-native';

export default class Inbox extends Component {
  render() { return (
    <View style={{paddingBottom: 14}}>
      { this.props.inbox.map((float, key) => (
        <Float key={key} float={float} />
      ))}
    </View>
  )}
}
