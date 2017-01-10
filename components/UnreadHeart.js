'use strict';

import React from 'react';
import Component from './Component';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default class UnreadHeart extends Component {
  render() { return (
    <View style={styles.heart}>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('PlansScene')}>
        <Image source={require('../images/Heart.png')} />
      </TouchableOpacity>
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
