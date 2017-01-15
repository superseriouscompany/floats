'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import Logo from './Logo';
import Enemy from './Enemy';
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

    this.state = {
      loadingFriends: true,
      loadingRequests: true,
      friends: [],
      friendRequests: [],
      enemies: []
    };
    api.friends.all().then((allFriends) => {
      const friends = allFriends.filter(function(f) { return !f.blocked });
      const enemies = allFriends.filter(function(f) { return !!f.blocked });

      this.setState({friends: friends, enemies: enemies, loadingFriends: false});
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
          <Text style={{color: 'darksalmon'}} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
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
        { this.state.enemies.length ?
          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: base.fontSizes.small, color: base.colors.mediumgrey}} onPress={() => this.setState({showEnemies: !this.state.showEnemies})}>
                {this.state.showEnemies ? 'hide' : 'show'} blocked
              </Text>
            </View>
            { this.state.showEnemies ?
              <View>
                {this.state.enemies.map((e, i) => (
                  <Enemy enemy={e} key={i} />
                ))}
              </View>
            : null
            }
          </View>
        : null
        }
      </ScrollView>
    </View>
  )}
}
