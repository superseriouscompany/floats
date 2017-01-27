'use strict';

import React, { Component } from 'react'
import FCM from 'react-native-fcm';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import api from '../services/api';
import {
  AsyncStorage
} from 'react-native';

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      FCM.requestPermissions();
      // FIXME: retry as long as it's not set
      FCM.getFCMToken().then( (token) => {
        if( !token ) { return console.warn("No firebase token available."); }
        api.sessions.updateFirebaseToken(accessToken, token);
      });
      FCM.on('refreshToken', (token) => {
        if( !token ) { return console.warn("No firebase token on refresh."); }
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
            friends = friends.map(function(f) {
              f.selected = true;
              return f;
            })
            this.setState({friends: friends, loaded: true, allSelected: true});
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
    <CreateFloatScene {...this.props} loaded={this.state.loaded} error={this.state.error} friends={this.state.friends}/>
  )}
}

export default connect()(CreateFloatCtrl);
