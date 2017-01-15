'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Friend extends Component {
  constructor(props) {
    super(props);
  }

  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={{uri: this.props.friend.avatar_url}}/>
      <Text style={[styles.main, {marginRight: 10}]}>{this.props.friend.name}</Text>
      <Image source={require('../images/Gear.png')} />
    </View>
  )}
}

Friend.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});
