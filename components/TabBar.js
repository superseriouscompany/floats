'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TabBar extends Component {
  render() { return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('PlansScene')}>
        <Text style={this.props.active == 'floats' ? styles.active : null}>
          Floats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
        <Text style={this.props.active == 'createFloat' ? styles.active : null}>
          Create Float
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('FriendsScene')}>
        <Text style={this.props.active == 'friends' ? styles.active : null}>
          Friends
        </Text>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  active: {
    color: 'slateblue',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: base.colors.lightgrey,
  }
})
