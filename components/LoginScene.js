'use strict';

import React, {Component} from 'react';

import {
  View,
  requireNativeComponent,
  NativeAppEventEmitter,
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
    <View style={styles.container}>


      <AppText style={styles.welcome}>
        Nope
      </AppText>

      <LoginButton style={{width: 100, height: 100}}></LoginButton>
    </View>
  )}

  componentWillUnmount() {
    successSubscription.remove();
    failureSubscription.remove();
  }
}
