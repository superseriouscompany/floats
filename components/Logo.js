'use strict';

import React from 'react';
import Component from './Component';
import AppText from './AppText';
import base from '../styles/base';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class Logo extends Component {
  render() { return (
    <View style={styles.container}>
      <AppText style={base.textLogo}>bubbles</AppText>
      <Text style={base.textTagline}>all your closest friends</Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 9,
  },
})
