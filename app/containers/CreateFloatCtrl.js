'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends, changeRadius } from '../actions/nearbyFriends';
import FCM, {FCMEvent} from 'react-native-fcm';
import api from '../services/api';
import branch from 'react-native-branch';

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);
    this.refresh      = this.refresh.bind(this);
    this.changeRadius = this.changeRadius.bind(this)
    this.isSharing    = false;
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

  changeRadius(value) {
    this.props.dispatch(changeRadius(value));
  }

  render() { return (
    <CreateFloatScene {...this.props} refresh={this.refresh} changeRadius={this.changeRadius}/>
  )}
}

function mapStateToProps(state) {
  const friends = state.nearbyFriends.items.filter((f) => {
    return f.distance <= state.nearbyFriends.radius
  })

  return {
    user:      state.user,
    loading:   state.nearbyFriends.loading,
    error:     state.nearbyFriends.error,
    friends:   friends,
    cacheTime: state.nearbyFriends.cacheTime,
    radius:    state.nearbyFriends.radius,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
