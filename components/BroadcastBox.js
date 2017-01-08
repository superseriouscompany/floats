'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const base = require('../styles/base');

export default class BroadcastBox extends Component {
  render() { return (
    <View style={[base.padded, styles.container]}>
      <TextInput style={[styles.input]} placeholder="Sup?"/>
      <TouchableOpacity onPress={() => alert('Nope.')}>
        <Text style={[base.padded, styles.button]}>send</Text>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    fontSize: 13,
    padding: 4,
    height: 26,
  },
  button: {
    color: 'lawngreen',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  }
})
