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
  TouchableOpacity,
  View,
} from 'react-native';
import {BackAndroid} from 'react-native'


export default class RandosScene extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, friends: [] }
    this.androidBackButton = this.androidBackButton.bind(this);

    api.randos.all().then((randos) => {
      this.setState({loaded: true, randos: randos });
    }).catch((err) => {
      this.setState({loaded: true, error: err.message});
      console.error(err);
    });
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.androidBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.androidBackButton);
  }

  androidBackButton() {
    this.props.navigator.navigate('FriendsScene');
    return true;
}


  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>find friends</Heading>
      </View>

      <View style={{flex: 1}}>
        { !this.state.loaded ?
          <ActivityIndicator
            style={[base.loadingCenter, {transform: [{scale: 1.25}]}]}
            size="small"
            color={base.colors.mediumgrey}
          />
        : this.state.randos.length ?
          <ScrollView>
            <View style={{paddingBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor:base.colors.lightgrey}}>
              {this.state.randos.map((f, i) => (
                <Rando key={i} friend={f} />
              ))}
            </View>
            <InviteButton />
          </ScrollView>
        :
          <InviteButton />
        }
      </View>

      <TouchableOpacity style={styles.bottom} onPress={() => this.props.navigator.navigate('FriendsScene')}>
        <Text style={{color: base.colors.mediumgrey}}>
          done
        </Text>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  bottom: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: base.colors.lightgrey,
  }
})
