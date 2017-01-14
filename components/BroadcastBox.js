'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class BroadcastBox extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  broadcast() {
    if( !this.state.text ) { return; }
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      return api.floats.create(accessToken, this.props.friends.map(function(f) { return f.id}), this.state.text).then(function() {
        Alert.alert("We told your friends!");
      });
    }).catch(function(err) {
      Alert.alert(err);
      console.error(err);
    })
  }

  render() { return (
    <View style={[base.inputContainer, styles.container]}>
      <TextInput style={[base.input]} placeholder="Who here's up for..." onChangeText={(text) => this.setState({text})}/>
      <TouchableOpacity onPress={this.broadcast.bind(this)}>
        <Text style={base.inputButton}>send</Text>
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
