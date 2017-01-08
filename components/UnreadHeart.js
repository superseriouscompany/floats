'use strict';

import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  View
} from 'react-native';

export default class UnreadHeart extends Component {
  render() { return (
    <View style={styles.heart}>
      <Image source={require('../images/Heart.png')} />
    </View>
  )}
}

const styles = StyleSheet.create({
  heart: {
    paddingTop: 10,
    paddingLeft: 14,
    paddingBottom: 10,
    paddingRight: 10,
  }
});
