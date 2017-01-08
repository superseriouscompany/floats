'use strict';

import React, {Component} from 'react';

import AppText from './AppText';

export default class Heading extends Component {
  render() { return (
    <AppText>{this.props.children}</AppText>
  )}
}
