'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendsScene from '../components/FriendsScene'

class FriendsCtrl extends Component {
  render() { return (
    <FriendsScene {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {
    loading: state.friends.loading,
    friends: state.friends.items,
    enemies: state.friends.enemies,
    error:   state.friends.error,
  };
}

export default connect(mapStateToProps)(FriendsCtrl);
