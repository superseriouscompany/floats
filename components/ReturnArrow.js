'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default class ReturnArrow extends Component {
  render() { return (
      <TouchableOpacity style={styles.rightArrow} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
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
