'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendsCtrl from '../containers/FriendsCtrl';
import MessagesCtrl from '../containers/MessagesCtrl';
import FloatsCtrl from '../containers/FloatsCtrl';
import CreateFloatCtrl from '../containers/CreateFloatCtrl';
import BacalhauCtrl from '../containers/BacalhauCtrl';
import RandosScene from '../components/RandosScene';
import ActivityPromptScene from '../components/ActivityPromptScene';
import BackgroundPermissionScene from '../components/BackgroundPermissionScene';
import NotificationPermissionScene from '../components/NotificationPermissionScene';
import Permissions from 'react-native-permissions'
import {processDeeplink} from '../actions/deeplinks';
import {
  Platform,
  Text,
  View,
} from 'react-native'

var defaultScene = 'CreateFloatScene';
defaultScene = 'ActivityPromptScene';

class AuthedCtrl extends Component {
  componentWillMount() {
    if( !this.props.user ) {
      this.props.navigator.navigate('LoginScene');
    }
    if( this.props.deeplinks.length ) {
      Promise.all(this.props.deeplinks.map((dl) => {
        return this.props.dispatch(processDeeplink(dl, this.props.user))
      })).then(() => {
        this.props.dispatch({type: 'deeplinks:purge'})
      }).catch((err) => {
        console.warn(err);
      })
    }

    Promise.all([
      Permissions.getPermissionStatus('location'),
      Platform.OS == 'android' ? Promise.resolve(true) : Permissions.getPermissionStatus('notification'),
    ]).then((v) => {
      const locationStatus     = v[0];
      const notificationStatus = v[1];
      if( locationStatus == 'undetermined' ) {
        return this.props.navigator.navigate('BackgroundPermissionScene')
      } else if( notificationStatus == 'undetermined' ) {
        return this.props.navigator.navigate('NotificationPermissionScene');
      }

      this.props.navigator.navigate(defaultScene);
    }).catch((err) => {
      console.error(err);
      this.props.navigator.navigate(defaultScene);
    })
  }

  render() { return (
    <View style={{flex: 1}}>
      { this.props.scene == 'Scratch' ?
        <Scratch />
      : this.props.scene == 'BackgroundPermissionScene' ?
        <BackgroundPermissionScene navigator={this.props.navigator} />
      : this.props.scene == 'NotificationPermissionScene' ?
        <NotificationPermissionScene navigator={this.props.navigator} />
      : this.props.scene == 'ActivityPromptScene' ?
        <ActivityPromptScene navigator={this.props.navigator} />
      : this.props.scene == 'AuthedScene' || !this.props.scene ?
        null
      :
        <BacalhauCtrl>
          { this.props.scene == 'CreateFloatScene' ?
            <CreateFloatCtrl navigator={this.props.navigator} />
          : this.props.scene == 'FloatsScene' ?
            <FloatsCtrl navigator={this.props.navigator} />
          : this.props.scene == 'FriendsScene' ?
            <FriendsCtrl navigator={this.props.navigator} />
          : this.props.scene == 'RandosScene' ?
            <RandosScene navigator={this.props.navigator} />
          : this.props.scene == 'MessagesScene' ?
            <MessagesCtrl navigator={this.props.navigator} />
          :
            null
          }
        </BacalhauCtrl>
      }

    </View>
  )}
}

function mapStateToProps(state) {
  return {
    user:      state.user,
    deeplinks: state.deeplinks,
  };
}

export default connect(mapStateToProps)(AuthedCtrl);
