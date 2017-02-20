'use strict';

import React, {Component} from 'react';
import FriendsScene from '../components/FriendsScene'
import BackgroundGeolocation from "react-native-background-geolocation";
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist'
import { fetchFriends, block, unblock } from '../actions/friends'
import { fetchFriendRequests, accept, deny } from '../actions/friendRequests'
import {
  AsyncStorage,
  Platform,
} from 'react-native'

class FriendsCtrl extends Component {
  constructor(props) {
    super(props)

    this.accept  = this.accept.bind(this);
    this.deny    = this.deny.bind(this);
    this.block   = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout  = this.logout.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchFriends(this.props.friends.cacheTime));
    this.props.dispatch(fetchFriendRequests(this.props.friendRequests.cacheTime));
  }

  render() { return (
    <FriendsScene {...this.props}
      accept={this.accept}
      deny={this.deny}
      block={this.block}
      unblock={this.unblock}
      refresh={this.refresh}
      logout={this.logout} />
  )}

  refresh() {
    this.props.dispatch(fetchFriends());
    this.props.dispatch(fetchFriendRequests());
  }

  accept(id) {
    if( !id ) { return console.warn('No id provided'); }
    this.props.dispatch(accept(id));
  }

  deny(id) {
    if( !id ) { return console.warn('No id provided'); }
    this.props.dispatch(deny(id));
  }

  block(id) {
    if( !id ) { return console.warn('No id provided'); }
    this.props.dispatch(block(id));
  }

  unblock(id) {
    if( !id ) { return console.warn('No id provided'); }
    this.props.dispatch(unblock(id));
  }

  logout() {
    AsyncStorage.removeItem('@floats:accessToken').then(() => {
      return AsyncStorage.removeItem('@floats:user')
    }).then(() => {
      persistStore(this.context.store, {storage: AsyncStorage}).purge();
      if( Platform.OS != 'android' ) {
        BackgroundGeolocation.stop((ok) => {
          console.log('stopped geolocating', JSON.stringify(ok));
        })
      }
      this.props.navigator.navigate('LoginScene');
    }).catch(function(err) {
      console.error(err);
      alert("Sorry, we couldn't log you out. Please try again.")
    })
  }
}

function mapStateToProps(state) {
  return {
    friends:        state.friends,
    friendRequests: state.friendRequests,
  };
}

FriendsCtrl.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps)(FriendsCtrl);
