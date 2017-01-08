'use strict';

import React, {Component} from 'react';

import {
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from './AppText';

export default class Zapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  render() { return (
    <View>
      <TouchableOpacity onPress={this.toggle.bind(this)}>
        { this.state.active ?
          <AppText>Going</AppText>
        :
          <AppText>Not Going</AppText>
        }
      </TouchableOpacity>
    </View>
  )}

  toggle() {
    this.setState({active: !this.state.active})
  }
}
