'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends } from '../actions/nearbyFriends';
import FCM, {FCMEvent} from 'react-native-fcm';
import api from '../services/api';
import branch from 'react-native-branch';

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);
    this.refresh          = this.refresh.bind(this);
    this.isSharing        = false;
  }

  componentDidMount() {
    this.props.dispatch(fetchNearbyFriends(this.props.cacheTime));

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

  render() { return (
    <CreateFloatScene {...this.props} refresh={this.refresh}/>
  )}
}

function mapStateToProps(state) {
  return {
    user:      state.user,
    loading:   state.nearbyFriends.loading,
    error:     state.nearbyFriends.error,
    friends:   state.nearbyFriends.items,
    cacheTime: state.nearbyFriends.cacheTime,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
