'use strict';

import React, {Component} from 'react';

import {
  Image,
  View
} from 'react-native';

import AppText from './AppText';

export default class Plan extends Component {
  render() { return (
    <View style={{flexDirection: 'row'}}>
      <Image source={{url: this.props.plan.user.avatar_url}} style={{width: 40, height: 40}} />
      <AppText style={{flex: 1}}>{this.props.plan.user.name || 'You'} "{this.props.plan.title}"</AppText>
    </View>
  )}
}
