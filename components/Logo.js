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
      <Text style={base.textLogo}>bubbles</Text>
      <AppText style={base.textTagline}>all your closest friends</AppText>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
})
