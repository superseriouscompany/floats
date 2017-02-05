'use strict';

import React, {Component} from 'react';
import Text from './Text';
import base from '../styles/base';
import api from '../services/api';
import { connect } from 'react-redux';
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TabBar extends Component {
  render() { return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigator.navigate('FloatsScene')}>
        { this.props.active == 'floats' ?
          <Image source={require('../images/ChatTabIconActive.png')} />
        :
          <Image source={require('../images/ChatTabIcon.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
        { this.props.active == 'createFloat' ?
          <Image source={require('../images/CreateFloatTabIconActive.png')} />
        :
          <Image source={require('../images/CreateFloatTabIcon.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigator.navigate('FriendsScene')}>
        { this.props.active == 'friends' ?
          <Image source={require('../images/FriendsTabIconActive.png')} />
        :
          <Image source={require('../images/FriendsTabIcon.png')} />
        }
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
    backgroundColor: 'white',
  },
  tabItem: {
    flex: .333,
    alignItems: 'center',
  }
})
