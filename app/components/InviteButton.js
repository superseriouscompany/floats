'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';

export default class InviteButton extends Component {
  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={require('../images/MissingProfileCircle.png')} />
      <Text style={[styles.main, {marginRight: 10}]}>Missing Someone?</Text>
    </View>
  )}
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
  }
})
