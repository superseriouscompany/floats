'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

export default class Enemy extends Component {
  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={{uri: this.props.enemy.avatar_url}}/>
      <Text style={[styles.main, {marginRight: 10}]}>{this.props.enemy.name}</Text>
      <TouchableOpacity onPress={() => this.props.unblockDialog(this.props.enemy.id, this.props.enemy.name)}>
        <Image source={require('../images/Gear.png')} />
      </TouchableOpacity>
    </View>
  )}
}

Enemy.propTypes = {
  unblockDialog: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});
