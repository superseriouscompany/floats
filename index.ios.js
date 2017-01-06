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
} from 'react-native';

const LoginButton = requireNativeComponent('RCTFBLogin', null);

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
