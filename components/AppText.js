'use strict';

// https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance

import React, {Component} from 'react';

import {
  Text,
} from 'react-native';

export default class AppText extends Component {
  render() { return (
    <Text {...this.props}>
      <Text style={{fontFamily: 'Poppins'}}>
        {this.props.children}
      </Text>
    </Text>
  )}
}
