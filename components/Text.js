'use strict';

// https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance
import React from 'react';
import Component from './Component';
import base from '../styles/base';
import {
  Text,
} from 'react-native';

export default class AppText extends Component {
  constructor(props) {
    super(props)
    this.style = [{fontFamily: 'Poppins', fontSize: 16, color: base.colors.darkgrey, letterSpacing: 1.05}];
    if( props.style ) {
      if( Array.isArray(props.style) ) {
        this.style = this.style.concat(props.style)
      } else {
        this.style.push(props.style)
      }
    }
  }

  render() { return (
    <Text {...this.props} style={this.style}>
      {this.props.children}
    </Text>
  )}
}
