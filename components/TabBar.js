'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TabBar extends Component {
  render() { return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('PlansScene')}>
        { this.props.active == 'floats' ?
          <Image source={require('../images/HeartActive.png')} />
        :
          <Image source={require('../images/Heart.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
        { this.props.active == 'createFloat' ?
          <Image source={require('../images/AirplaneActive.png')} />
        :
          <Image source={require('../images/Airplane.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigator.navigate('FriendsScene')}>
        { this.props.active == 'friends' ?
          <Image source={require('../images/ProfileActive.png')} />
        :
          <Image source={require('../images/Profile.png')} />
        }
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.5,
    borderColor: base.colors.lightgrey,
  }
})
