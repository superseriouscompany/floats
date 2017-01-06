/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  requireNativeComponent,
  NativeAppEventEmitter,
} from 'react-native';

const LoginButton = requireNativeComponent('RCTFBLogin', null);

import FCM from 'react-native-fcm';

var successSubscription = NativeAppEventEmitter.addListener(
  'FBLoginSuccess',
  (nice) => console.log('got login success', nice)
);

var failureSubscription = NativeAppEventEmitter.addListener(
  'FBLoginFailure',
  (nice) => console.log('got login failure', nice)
);

export default class batsignal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Nope
        </Text>

        <LoginButton style={{width: 100, height: 100}}></LoginButton>
      </View>
    );
  }

  componentDidMount() {
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log(token.substring(0, 5));
    });
    FCM.on('refreshToken', (token) => {
      console.log(token.substring(0, 5));
    })
  }

  componentWillUnmount() {
    subscription.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('batsignal', () => batsignal);
