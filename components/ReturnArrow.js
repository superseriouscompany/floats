'use strict';

import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import AppText from './AppText';

export default class ReturnArrow extends Component {
  render() { return (
      <TouchableOpacity style={styles.rightArrow} onPress={() => this.props.navigator.navigate('FriendsScene')}>
        <Image source={require('../images/RightArrow.png')} />
      </TouchableOpacity>
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
