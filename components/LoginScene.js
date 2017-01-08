'use strict';

import React, {Component} from 'react';

import {
  Text,
  View,
  requireNativeComponent,
  NativeAppEventEmitter,
  TouchableOpacity,
} from 'react-native';

import AppText from './AppText';
const LoginButton = requireNativeComponent('RCTFBLogin', null);

var successSubscription = NativeAppEventEmitter.addListener(
  'FBLoginSuccess',
  (nope) => console.log('got login success', nope)
);

var failureSubscription = NativeAppEventEmitter.addListener(
  'FBLoginFailure',
  (nope) => console.log('got login failure', nope)
);

export default class LoginScene extends Component {
  render() { return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{justifyContent: 'center', flex: 0.8}}>
        <TouchableOpacity onPress={() => this.props.navigator.navigate('FriendsScene')}>
          <Text style={{color: 'red'}}>|U|</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', flex: 0.2}}>
        <LoginButton style={{width: 180, height: 40}}></LoginButton>
      </View>
    </View>
  )}

  componentWillUnmount() {
    successSubscription.remove();
    failureSubscription.remove();
  }
}
