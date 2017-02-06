'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends } from '../actions/nearbyFriends';
import FCM, {FCMEvent} from 'react-native-fcm';
import api from '../services/api';
import branch from 'react-native-branch';
import {
  ActionSheetIOS
} from 'react-native'

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);
    this.refresh          = this.refresh.bind(this);
    this.invitationDialog = this.invitationDialog.bind(this)
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

  invitationDialog() {
    if( !this.props.user || !this.props.user.id ) {
      console.warn("No user set", JSON.stringify(this.props));
    }
    if( this.isSharing ) { return }
    this.isSharing = true;

    let branchUniversalObject = branch.createBranchUniversalObject(
      `friends/invite/${this.props.user.id}`,
      {
        metadata: {
          inviter_id: this.props.user.id,
        }
      }
    )

    let linkProperties = {
      feature: 'friend-invitation',
      channel: 'app'
    }

    let controlParams = {
      '$ios_deepview': 'floats_deepview_vk8d',
    }

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((thing) => {
      this.isSharing = false;
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: thing.url,
        message: 'Download Floats',
      }, (error) => {
        console.error(error);
        alert(error.message);
      }, (success, method) => {
      })
    }).catch((err) => {
      this.isSharing = false;
      console.error(err);
      alert(err.message);
    });
  }

  render() { return (
    <CreateFloatScene {...this.props} refresh={this.refresh} invitationDialog={this.invitationDialog}/>
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
