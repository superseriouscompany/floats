'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import api from '../services/api';
import base from '../styles/base';
import {
  TouchableOpacity,
  View,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';

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
          <Image source={require('../images/Bumped.png')} />
        :
          <Image source={require('../images/Bump.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  toggle() {
    if( !this.state.active ) {
      AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
        return api.floats.join(accessToken, this.props.floatId, !!this.state.wasActive);
      }).then(() => {
        this.setState({wasActive: true});
        Alert.alert("Boom", `We let them know that you're down. Text to coordinate.`);
      }).catch(function(err) {
        console.error(err);
      })
    }
    this.setState({active: !this.state.active});
  }
}
