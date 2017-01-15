'use strict';

import React from 'react';
import Component from './Component';
import Heading from './Heading';
import Text from './Text';
import Rando from './Rando';
import Logo from './Logo';
import InviteButton from './InviteButton';
import api from '../services/api';
import base from '../styles/base';
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default class RandosScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false, friends: [] }

    api.randos.all().then((randos) => {
      this.setState({loaded: true, randos: randos });
    }).catch((err) => {
      this.setState({loaded: true, error: err.message});
      console.error(err);
    });
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>floats in action</Heading>
      </View>

      <View style={{flex: 1}}>
        { !this.state.loaded ?
          <ActivityIndicator color="hotpink" />
        : this.state.randos.length ?
          <ScrollView>
            {this.state.randos.map((f, i) => (
              <Rando key={i} friend={f} />
            ))}
            <InviteButton />
          </ScrollView>
        :
          <InviteButton />
        }
      </View>

      <View style={styles.bottom}>
        <Text onPress={() => this.props.navigator.navigate('FriendsScene')}>done</Text>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  bottom: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'darkgoldenrod'
  }
})
