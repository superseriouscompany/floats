'use strict';

import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  View
} from 'react-native';

import AppText from './AppText';

export default class ReturnArrow extends Component {
  render() { return (
    <View style={styles.rightArrow}>
      <Image source={require('../images/RightArrow.png')} />
    </View>
  )}
}

const styles = StyleSheet.create({
  rightArrow: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 14,
  }
});
