/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';

import NearbyFriendsScene from './components/NearbyFriendsScene';
import LoginScene from './components/LoginScene';
import PlansScene from './components/PlansScene';
import FriendsScene from './components/FriendsScene';
import Text from './components/Text';
import api from './services/api';
import store from './services/store';

export default class batsignal extends Component {
  constructor(props) {
    super(props);
    this.state = { props: {}};
    this.state.scene = 'PlansScene';
    this.state.scene = 'NearbyFriendsScene';
    this.state.scene = 'LoginScene';
    this.state.scene = 'FriendsScene';

    this.navigator = {
      navigate: (component, props) => {
        let stateChange = { scene: component, props: props || {} };
        this.setState(stateChange);
      }
    }
  }

  getChildContext() {
    return {
      store: store
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.scene == 'LoginScene' ?
          <LoginScene navigator={this.navigator} />
        : this.state.scene == 'NearbyFriendsScene' ?
          <NearbyFriendsScene navigator={this.navigator} />
        : this.state.scene == 'PlansScene' ?
          <PlansScene navigator={this.navigator} />
        : this.state.scene == 'FriendsScene' ?
          <FriendsScene navigator={this.navigator} />
        :
          <Text>404</Text>
        }
      </View>
    )
  }
}

batsignal.childContextTypes = {
  store: React.PropTypes.object
}

AppRegistry.registerComponent('batsignal', () => batsignal);
