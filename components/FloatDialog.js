'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  Alert,
  AsyncStorage,
  Image,
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
    <View style={styles.container}>
      <View style={[styles.inputContainer]}>
        <TextInput style={[styles.input]} placeholder="gauge interest" placeholderTextColor={base.colors.lightgrey} onChangeText={(text) => this.setState({text})}/>
      </View>
      <TouchableOpacity onPress={this.create.bind(this)}>
        <Image source={require('../images/PaperAirplane.png')} />
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
  inputContainer: {
    backgroundColor: base.colors.white,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#BEBEBE',
    marginRight: 19,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: base.colors.darkgrey,
    height: 32,
    paddingTop: 1.5,
    paddingLeft: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 27,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 21,
    borderBottomWidth: .5,
    borderBottomColor: base.colors.lightgrey,
  },
})