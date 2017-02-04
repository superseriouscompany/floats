'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendsScene from '../components/FriendsScene'
import { fetchFriends, block, unblock } from '../actions/friends'
import { fetchFriendRequests, accept, deny } from '../actions/friendRequests'

class FriendsCtrl extends Component {
  constructor(props) {
    super(props)

    this.accept = this.accept.bind(this);
    this.deny   = this.deny.bind(this);
    this.block  = this.block.bind(this);
    this.unblock  = this.unblock.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchFriends());
    this.props.dispatch(fetchFriendRequests());
  }

  render() { return (
    <FriendsScene {...this.props}
      accept={this.accept}
      deny={this.deny}
      block={this.block}
      unblock={this.unblock}/>
  )}

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
}

function mapStateToProps(state) {
  return {
    friends:        state.friends,
    friendRequests: state.friendRequests,
  };
}

export default connect(mapStateToProps)(FriendsCtrl);
