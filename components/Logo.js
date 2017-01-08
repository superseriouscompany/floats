'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import AppText from './AppText';
const base = require('../styles/base');

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
