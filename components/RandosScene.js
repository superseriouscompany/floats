'use strict';

import React from 'react';
import Component from './Component';
import Rando from './Rando';
import api from '../services/api';
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default class RandosScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false, friends: [] }

    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      return api.randos.all(accessToken).then((randos) => {
        this.setState({loaded: true, randos: randos });
      });
    }).catch((err) => {
      this.setState({loaded: true, error: err.message});
      console.error(err);
    })
  }

  render() { return (
    <View style={{flex: 1}}>
      { !this.state.loaded ?
        <ActivityIndicator color="hotpink" />
      : this.state.randos.length ?
        <ScrollView>
          {this.state.randos.map((f, i) => (
            <Rando key={i} friend={f} />
          ))}
        </ScrollView>
      :
        null
      }
    </View>
  )}
}
