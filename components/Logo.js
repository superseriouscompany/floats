'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class Logo extends Component {
  render() { return (
    <View style={styles.container}>
      <Text style={base.textLogo}>floats</Text>
      <Text style={base.textTagline}>find your close friends</Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8.25,
  },
})
