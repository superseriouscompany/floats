'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import {
  TouchableOpacity,
  View,
  Image,
  Alert,
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
          <Image source={require('../images/Zapped.png')} />
        :
          <Image source={require('../images/Unzapped.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  toggle() {
    if( !this.state.active ) {
      AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
        return api.join(accessToken, this.props.floatId, !!this.state.wasActive);
      }).then(function() {
        this.setState({wasActive: true});
        Alert.alert("Boom", `We let them know that you're down. Text to coordinate.`);
      }).catch(function(err) {
        console.error(err);
      })
    }
    this.setState({active: !this.state.active});
  }
}
