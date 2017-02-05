'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends } from '../actions/nearbyFriends';
import FCM, {FCMEvent} from 'react-native-fcm';
import api from '../services/api';
import {
  ActionSheetIOS
} from 'react-native'

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchNearbyFriends(this.props.cacheTime));

    // FIXME: move this to its own container and retry as long as it's not set
    FCM.requestPermissions();
    FCM.getFCMToken().then( (token) => {
      if( !token ) { return console.warn("No firebase token available."); }
      api.sessions.updateFirebaseToken(token);
    });
    FCM.on(FCMEvent.RefreshToken, (token) => {
      if( !token ) { return console.warn("No firebase token on refresh."); }
      api.sessions.updateFirebaseToken(token);
    })
  }

  refresh() {
    this.props.dispatch(fetchNearbyFriends(null));
  }

  invitationDialog() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://floats.app.link/floats/join?token=cool',
      message: 'Download this babbage',
    }, (error) => {
      console.error(error);
      alert(error.message);
    }, (success, method) => {
      if( success ) {
        alert(`Shared via ${method}`)
      } else {
        alert('Not shared')
      }
    })
  }

  render() { return (
    <CreateFloatScene {...this.props} refresh={this.refresh} invitationDialog={this.invitationDialog}/>
  )}
}

function mapStateToProps(state) {
  return {
    loading:   state.nearbyFriends.loading,
    error:     state.nearbyFriends.error,
    friends:   state.nearbyFriends.items,
    cacheTime: state.nearbyFriends.cacheTime,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
