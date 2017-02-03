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
  return {};
}

export default connect(mapStateToProps)(FriendsCtrl);
