'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  Alert,
  ActivityIndicator,
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
        <TextInput style={[styles.input]} placeholder="gauge interest" placeholderTextColor={base.colors.mediumgrey} onChangeText={(text) => this.setState({text})}/>
      </View>
      { this.state.sending ?
        <ActivityIndicator
          style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
          size="small"
          color={base.colors.mediumgrey}
        />
      :
        <TouchableOpacity onPress={this.create.bind(this)}>
          <Image source={require('../images/PaperAirplane.png')} />
        </TouchableOpacity>
      }
    </View>
  )}

  create() {
    if( !this.state.text ) { return; }

    this.setState({sending: true});

    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      const friends = this.props.friends.map(function(f) {
        return f.id
      })
      return api.floats.create(accessToken, friends, this.state.text)
    }).then(() => {
      this.context.store.dispatch({type: 'navigation:queue', route: 'FloatsScene'});
      this.context.store.dispatch({type: 'dirty'});
    }).catch(function(err) {
      this.setState({sending: false});
      Alert.alert(err);
      console.error(err);
    })
  }
}

FloatDialog.contextTypes = {
  store: React.PropTypes.object,
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
    paddingTop: 1.25,
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
