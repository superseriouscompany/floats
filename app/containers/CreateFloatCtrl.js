'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends, changeRadius } from '../actions/nearbyFriends';
import { fetchRandos } from '../actions/randos';
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
    this.props.dispatch(fetchRandos(this.props.randoCacheTime));
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
    this.props.dispatch(fetchRandos(null));
  }

  changeRadius(value) {
    this.props.dispatch(changeRadius(value));
  }

  render() { return (
    <CreateFloatScene {...this.props} refresh={this.refresh} changeRadius={this.changeRadius}/>
  )}
}

function mapStateToProps(state) {
  let friends = [];
  if( state.nearbyFriends && state.nearbyFriends.items ) {
    friends = state.nearbyFriends.items.filter((f) => {
      return f.distance <= state.nearbyFriends.radius
    })
  }

  let randos = [];
  if( state.randos && state.randos.items ) {
    randos = state.randos.items.filter((r) => {
      return r.distance <= state.nearbyFriends.radius
    })
  }

  return {
    user:           state.user,
    loading:        state.nearbyFriends.loading,
    error:          state.nearbyFriends.error,
    friends:        friends,
    randos:         randos,
    cacheTime:      state.nearbyFriends.cacheTime,
    randoCachetime: state.randos.cacheTime,
    radius:         state.nearbyFriends.radius,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
