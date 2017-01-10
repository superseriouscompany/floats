'use strict';

import React from 'react';
import AppText from './AppText';
import Component from './Component';
import base from '../styles/base';
import {
  Image,
  View
} from 'react-native';

export default class Attendee extends Component {
  render() { return (
    <View style={{flexDirection: 'row', paddingBottom: 6 }}>
      <Image style={base.miniPhotoCircle} source={{url: this.props.user.avatar_url}} />
      <AppText style={[{flex: 1}, base.timestamp]}>{this.props.user.name}</AppText>
    </View>
  )}
}
