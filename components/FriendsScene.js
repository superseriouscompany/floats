'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Heading from './Heading';
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import Logo from './Logo';
import Enemy from './Enemy';
import TabBar from './TabBar';
import api from '../services/api';
import base from '../styles/base';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
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
        <View style={[base.leftNav, styles.leftNavButton]} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
          <Image source={require('../images/Ellipses.png')} />
        </View>
        <View style={base.header}>
          <Heading>friends</Heading>
        </View>
        <View style={[base.rightNav, styles.rightNavButton]} onPress={() => this.props.navigator.navigate('RandosScene')}>
          <Image source={require('../images/Plus.png')} />
        </View>
      </View>
      <ScrollView>
        { this.state.loadingRequests ?
          <View style={{height: 50}}>
            <ActivityIndicator
              style={[base.loadingTop, {transform: [{scale: 1.5}]}]}
              size="small"
              color={base.colors.color1}
            />
          </View>
        : this.state.friendRequests.length ?
          <View style={[base.bgBreakingSection, {paddingBottom: 16}]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{paddingTop: 10, color: base.colors.mediumgrey, fontSize: 12}}>{this.state.friendRequests.length} friend requests</Text>
            </View>
            <View style={{marginTop: -10}}>
              {this.state.friendRequests.map((f, i) => (
                <FriendRequest key={i} friend={f} />
              ))}
            </View>
          </View>
        : null
        }
        { this.state.loadingFriends ?
          <View style={{height: 50}}>
            <ActivityIndicator
              style={[base.loadingTop, {transform: [{scale: 1.5}]}]}
              size="small"
              color={base.colors.color1}
            />
          </View>
        : !this.state.friends.length ?
          <Text>You are alone.</Text>
        :
          <View style={{paddingBottom: 15}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{paddingTop: 10, color: base.colors.mediumgrey, fontSize: 12}}>{this.state.friends.length} friends</Text>
            </View>
            <View style={{marginTop: -15}}>
              { this.state.friends.map((f, i) => (
                <Friend friend={f} key={i} />
              ))}
            </View>
          </View>
        }
        { this.state.enemies.length ?
          <View>
            <View style={[base.bgBreakingSection, {alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.5, borderTopColor: base.colors.lightgrey}]}>
              <Text style={[base.timestamp, {paddingTop: 9, paddingBottom: 10, color: base.colors.mediumgrey}]} onPress={() => this.setState({showEnemies: !this.state.showEnemies})}>
                {this.state.showEnemies ? 'hide' : 'show'} blocked
              </Text>
            </View>
            { this.state.showEnemies ?
              <View style={{paddingBottom: 15}}>
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
      <TabBar active="friends" navigator={this.props.navigator}/>
    </View>
  )}
}

const styles = StyleSheet.create({
  leftNavButton: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 19,
    paddingRight: 14
  },
  rightNavButton: {
    padding: 17,
    paddingRight: 19,
  },
});
