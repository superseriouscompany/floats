'use strict';

import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UnreadHeart extends Component {
  render() { return (
    <View>
      <Image style={styles.heart} source={require('../images/Heart.png')} />
    </View>
  )}
}

const styles = StyleSheet.create({
  heart: {
  }
});
