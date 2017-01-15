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

export default class FloatDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() { return (
    <View style={[base.inputContainer, styles.container]}>
      <TextInput style={[styles.input]} placeholder="gauge interest" onChangeText={(text) => this.setState({text})}/>
      <TouchableOpacity onPress={this.create.bind(this)}>
        <Text>send</Text>
      </TouchableOpacity>
    </View>
  )}

  create() {
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
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: base.colors.white,
    flex: 1,
    fontSize: 16,
    height: 32,
    fontFamily: 'Poppins',
    paddingTop: 1.5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: base.colors.darkgrey,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
