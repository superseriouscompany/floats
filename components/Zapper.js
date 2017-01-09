'use strict';

import React, {Component} from 'react';

import {
  TouchableOpacity,
  View,
  Image,
  Alert,
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
          <Image source={require('../images/Zapped.png')} />
        :
          <Image source={require('../images/Unzapped.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  toggle() {
    if( !this.state.active ) {
      Alert.alert("Boom", `We let them know that you're down. Text to coordinate.`);
    }
    this.setState({active: !this.state.active})
  }
}