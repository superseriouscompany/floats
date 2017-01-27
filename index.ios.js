import React, { Component } from 'react';
import Root from './app/containers/Root';
import { AppRegistry } from 'react-native';

export default class floats extends Component {
  render() { return (
    <Root />
  )}
}

AppRegistry.registerComponent('floats', () => floats);
