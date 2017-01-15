'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import Logo from './Logo';
import api from '../services/api';
import base from '../styles/base';
import {
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

export default class FriendsScene extends Component {
  constructor(props) {
    super(props);

    this.state = {loadingFriends: true, loadingRequests: true, friends: [], friendRequests: []};
    api.friends.all().then((friends) => {
      this.setState({friends: friends, loadingFriends: false});
    }).catch((err) => {
      this.setState({error: err.message, loadingFriends: false});
    })

    api.friendRequests.all().then((requests) => {
      this.setState({friendRequests: requests, loadingRequests: false});
    }).catch((err) => {
      this.setState({error: err.message, loadingRequests: false});
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <View style={base.leftNav}>
          <Text style={{color: 'darksalmon'}} onPress={() => this.props.navigator.navigate('NearbyFriendsScene')}>
            ...
          </Text>
        </View>
        <Logo text="friends" hideTagline={true} />
        <View style={base.rightNav}>
          <Text style={{color: 'lightseagreen'}} onPress={() => this.props.navigator.navigate('RandosScene')}>
            +
          </Text>
        </View>
      </View>
      <ScrollView>
        { this.state.loadingRequests ?
          <ActivityIndicator color="hotpink" />
        : this.state.friendRequests.length ?
          <View>
            {this.state.friendRequests.map((f, i) => (
              <FriendRequest key={i} friend={f} />
            ))}
          </View>
        : null
        }
        { this.state.loadingFriends ?
          <ActivityIndicator color="hotpink" />
        : !this.state.friends.length ?
          <Text>You are alone.</Text>
        :
          <View>
            { this.state.friends.map((f, i) => (
              <Friend friend={f} key={i} />
            ))}
          </View>
        }
      </ScrollView>
    </View>
  )}
}
