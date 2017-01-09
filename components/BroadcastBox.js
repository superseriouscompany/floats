'use strict';

import React, {Component} from 'react';

import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import base from '../styles/base';
const api  = require('../services/api');
import AppText from './AppText';

export default class BroadcastBox extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  broadcast() {
    if( !this.state.text ) { return; }
    return api.bubbles.create(null, this.state.text, 'nope').then(function() {
      Alert.alert("We told your friends!");
    }).catch(function(err) {
      Alert.alert(err);
      console.error(err);
    });
  }

  render() { return (
    <View style={[base.inputContainer, styles.container]}>
      <TextInput style={[base.input]} placeholder="Who's up for..." onChangeText={(text) => this.setState({text})}/>
      <TouchableOpacity onPress={this.broadcast.bind(this)}>
        <AppText style={base.inputButton}>send</AppText>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
