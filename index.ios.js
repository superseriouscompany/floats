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

import FCM from 'react-native-fcm';
import FriendsScene from './components/FriendsScene';
import LoginScene from './components/LoginScene';
import PlansScene from './components/PlansScene';
import Text from './components/Text';
import api from './services/api';
import store from './services/store';

export default class batsignal extends Component {
  constructor(props) {
    super(props);
    this.state = { props: {}};
    this.state.scene = 'LoginScene';

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
        : this.state.scene == 'FriendsScene' ?
          <FriendsScene navigator={this.navigator} />
        : this.state.scene == 'PlansScene' ?
          <PlansScene navigator={this.navigator} />
        :
          <Text>404</Text>
        }
      </View>
    )
  }

  componentDidMount() {
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      // TODO: retry
      api.sessions.updateFirebaseToken(null, token);
    });
    FCM.on('refreshToken', (token) => {
      // TODO: retry
      api.sessions.updateFirebaseToken(null, token);
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        api.sightings.create(null, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}
batsignal.childContextTypes = {
  store: React.PropTypes.object
}

AppRegistry.registerComponent('batsignal', () => batsignal);
