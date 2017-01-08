'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class Friend extends Component {
  render() { return (
    <View style={styles.box}>
      <Text>Friend</Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: 'grey'
  }
});
