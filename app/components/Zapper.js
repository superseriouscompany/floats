'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import api from '../services/api';
import base from '../styles/base';
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Zapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  render() { return (
    <View style={styles.zapContainer}>
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
        return api.floats.join(this.props.floatId, !!this.state.wasActive);
      }).then(() => {
        this.context.store.dispatch({type: 'dirty'});
      }).catch(function(err) {
        console.error(err);
      })
    }
    this.setState({active: !this.state.active});
  }
}

Zapper.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  zapContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingRight: 10.5,
    paddingBottom: 11.5,
  }
});
