'use strict';

import React, {Component} from 'react';

import {
  Image,
  View
} from 'react-native';

import AppText from './AppText';

const base = require('../styles/base');

export default class Attendee extends Component {
  render() { return (
    <View style={{flexDirection: 'row', paddingBottom: 6 }}>
      <Image style={base.miniPhotoCircle} source={{url: this.props.user.avatar_url}} />
      <AppText style={[{flex: 1}, base.timestamp]}>{this.props.user.name}</AppText>
    </View>
  )}
}
