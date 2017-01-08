'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const base = require('../styles/base');
import AppText from './AppText';

export default class BroadcastBox extends Component {
  render() { return (
    <View style={[base.inputContainer, styles.container]}>
      <TextInput style={[base.input]} placeholder="Whose up for..."/>
      <TouchableOpacity onPress={() => alert('Nope.')}>
        <AppText style={base.inputButton}>send</AppText>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
