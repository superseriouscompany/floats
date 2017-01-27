'use strict';

import React, { Component } from 'react';
import FCM from 'react-native-fcm';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends } from '../actions/nearbyFriends';
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
    this.setState({loading: true});
    this.props.dispatch(fetchNearbyFriends);

    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      FCM.requestPermissions();
      // FIXME: retry as long as it's not set
      FCM.getFCMToken().then( (token) => {
        if( !token ) { return console.warn("No firebase token available."); }
        api.sessions.updateFirebaseToken(token);
      });
      FCM.on('refreshToken', (token) => {
        if( !token ) { return console.warn("No firebase token on refresh."); }
        api.sessions.updateFirebaseToken(token);
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          api.pins.create({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }).then(function() {
            return api.friends.nearby();
          }).then((friends) => {
            friends = friends.map(function(f) {
              f.selected = true;
              return f;
            })
            this.props.dispatch({type: 'nearbyFriends:load:yes', friends: friends});
            this.setState({friends: friends, loading: false, allSelected: true});
          }).catch(function(err) {
            return console.error(err);
          })
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }).catch((err) => {
      this.props.dispatch({type: 'nearbyFriends:load:no', error: err});
      this.setState({error: err, loading: false});
    })
  }

  render() { return (
    <CreateFloatScene {...this.props}/>
  )}
}

function mapStateToProps(state) {
  return {
    loading: state.nearbyFriends && state.nearbyFriends.loading,
    error: state.nearbyFriends && state.nearbyFriends.error,
    friends: state.nearbyFriends && state.nearbyFriends.items,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
