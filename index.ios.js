/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  View,
} from 'react-native';

import CreateFloatScene from './components/CreateFloatScene';
import LoginScene from './components/LoginScene';
import PlansScene from './components/PlansScene';
import RandosScene from './components/RandosScene';
import FriendsScene from './components/FriendsScene';
import Text from './components/Text';
import api from './services/api';
import store from './services/store';

export default class batsignal extends Component {
  constructor(props) {
    super(props);
    this.state = { props: {}};

    this.navigator = {
      navigate: (component, props) => {
        let stateChange = { scene: component, props: props || {} };
        this.setState(stateChange);
      }
    }

    AsyncStorage.getItem('@floats:accessToken').then((token) => {
      if( token ) {
        this.setState({scene: 'CreateFloatScene'});
      } else {
        this.setState({scene: 'LoginScene'});
      }
    }).catch(function(err) {
      console.warn(err);
    });
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
        : this.state.scene == 'CreateFloatScene' ?
          <CreateFloatScene navigator={this.navigator} />
        : this.state.scene == 'PlansScene' ?
          <PlansScene navigator={this.navigator} />
        : this.state.scene == 'FriendsScene' ?
          <FriendsScene navigator={this.navigator} />
        : this.state.scene == 'RandosScene' ?
          <RandosScene navigator={this.navigator} />
        : !!this.state.scene ?
          <Text style={{padding: 200}}>404</Text>
        :
          null
        }
      </View>
    )
  }
}

batsignal.childContextTypes = {
  store: React.PropTypes.object
}

AppRegistry.registerComponent('batsignal', () => batsignal);
