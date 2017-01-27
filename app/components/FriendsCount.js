'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  View
} from 'react-native';

export default class FriendsCount extends Component {
  render() { return (
    <View style={{paddingLeft: 7}}>
      { this.props.count == 1 ?
        <Text>1 friend is around</Text>
      :
        <Text>{this.props.count} friends are around</Text>
      }
    </View>
  )}
}
