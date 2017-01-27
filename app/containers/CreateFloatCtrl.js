'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateFloatScene from '../components/CreateFloatScene';
import { fetchNearbyFriends } from '../actions/nearbyFriends';
import {
  AsyncStorage
} from 'react-native';

class CreateFloatCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({loading: true});
    this.props.dispatch(fetchNearbyFriends);
  }

  render() { return (
    <CreateFloatScene {...this.props}/>
  )}
}

function mapStateToProps(state) {
  return {
    loading: state.nearbyFriends && state.nearbyFriends.loading,
    error: state.nearbyFriends && state.nearbyFriends.error,
    friends: state.nearbyFriends && state.nearbyFriends.items,
  }
}

export default connect(mapStateToProps)(CreateFloatCtrl);
