'use strict';

import React from 'react';
import Component from './Component';
import api from '../services/api';
import {
  AsyncStorage,
  Text,
  View,
} from 'react-native';

export default class FriendsScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false, friends: [] }

    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      return api.friends.all(accessToken).then((friends) => {
        this.setState({loaded: true, friends: friends });
        console.warn(friends);
      });
    }).catch(function(err) {
      this.setState({loaded: true, error: err.message});
      console.error(err);
    })
  }

  render() { return (
    <View style={{flex: 1}}>
      <Text>Hello</Text>
    </View>
  )}
}
