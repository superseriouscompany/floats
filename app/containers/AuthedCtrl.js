'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendsCtrl from '../containers/FriendsCtrl';
import MessagesCtrl from '../containers/MessagesCtrl';
import FloatsCtrl from '../containers/FloatsCtrl';
import CreateFloatCtrl from '../containers/CreateFloatCtrl';
import RandosScene from '../components/RandosScene';
import BackgroundPermissionScene from '../components/BackgroundPermissionScene';
import NotificationPermissionScene from '../components/NotificationPermissionScene';
import {
  Text,
  View
} from 'react-native'


class AuthedCtrl extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    if( !this.props.user ) {
      this.props.navigator.navigate('LoginScene');
    }
    if( this.props.deeplinks.length ) {
      console.warn('Got deeplinks', this.props.deeplinks);
    }
    console.warn('mounted');
  }

  render() { return (
    <View style={{flex: 1}}>
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
      : this.props.scene == 'BackgroundPermissionScene' ?
        <BackgroundPermissionScene navigator={this.props.navigator} />
      : this.props.scene == 'NotificationPermissionScene' ?
        <NotificationPermissionScene navigator={this.props.navigator} />
      : this.props.scene == 'Scratch' ?
        <Scratch />
      :
        <Text style={{padding: 200}}>404</Text>
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
