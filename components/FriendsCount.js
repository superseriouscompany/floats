'use strict';

import React from 'react';
import Component from './Component';
import AppText from './AppText';
import {
  View
} from 'react-native';

export default class FriendsCount extends Component {
  render() { return (
    <View style={{paddingLeft: 7}}>
      <AppText>{this.props.count} friends are around</AppText>
    </View>
  )}
}
