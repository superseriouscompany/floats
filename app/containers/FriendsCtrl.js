'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendsScene from '../components/FriendsScene'
import { fetchFriends } from '../actions/friends'

class FriendsCtrl extends Component {
  componentWillMount() {
    this.props.dispatch(fetchFriends());
  }

  render() { return (
    <FriendsScene {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(FriendsCtrl);
