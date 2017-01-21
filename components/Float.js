'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  View,
} from 'react-native';

export default class Float extends Component {
  render() { return (
    <View>
      <Text>{this.props.float.title} ({this.props.float.convos && this.props.float.convos.length})</Text>
    </View>
  )}
}
