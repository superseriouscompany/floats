'use strict';

import React from 'react';
import FCM from 'react-native-fcm';
import Component from './Component';
import UnreadHeart from './UnreadHeart';
import Logo from './Logo';
import FriendsCount from './FriendsCount';
import Friend from './Friend';
import BroadcastBox from './BroadcastBox';
import Text from './Text';
import base from '../styles/base';
import api  from '../services/api';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export default class FriendsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      friends: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      FCM.requestPermissions();
      FCM.getFCMToken().then(token => {
        // TODO: retry
        api.sessions.updateFirebaseToken(accessToken, token);
      });
      FCM.on('refreshToken', (token) => {
        // TODO: retry
        api.sessions.updateFirebaseToken(accessToken, token);
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          api.pins.create(accessToken, {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }).then(function() {
            return api.friends.nearby(accessToken);
          }).then((friends) => {
            this.setState({friends: friends, loaded: true});
          }).catch(function(err) {
            return console.error(err);
          })
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }).catch((err) => {
      this.setState({error: err, loaded: true});
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <View style={base.leftNav}>
          <UnreadHeart navigator={this.props.navigator}/>
        </View>
        <Logo />
      </View>

      <View style={base.mainWindow}>
        { !this.state.loaded ?
          <ActivityIndicator
            style={[base.loadingCenter, {transform: [{scale: 1.5}]}]}
            size="small"
            color='#E88868'
          />
        : this.state.error ?
          <Text style={{color: 'indianred', textAlign: 'center'}}>{this.state.error}</Text>
        : !this.state.friends.length ?
          <View style={{alignItems: 'center'}}>
            <Text style={[base.timestamp, base.bgBreakingSection, {paddingTop: 9, paddingBottom: 10, color: base.colors.mediumgrey}]}>
              nobody is nearby.
            </Text>
          </View>
        :
          <View>
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection]}>
              <FriendsCount count={this.state.friends.length} />
            </View>
            <ScrollView>
              {this.state.friends.map((f, i) => (
                <Friend key={i} friend={f} />
              ))}
            </ScrollView>
          </View>
        }
      </View>

      { this.state.loaded && !this.state.friends.length ?
        null
      :
        <View style={base.bottomBar}>
          <BroadcastBox friends={this.state.friends} active={!this.state.friends.length}/>
        </View>
      }
    </View>
  )}
}
