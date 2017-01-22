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
  ActionSheetIOS,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
        <TouchableOpacity style={[base.leftNav, styles.leftNavButton]} onPress={() => this.showLogoutDialog()}>
          <Image source={require('../images/Ellipses.png')} />
        </TouchableOpacity>
        <View style={base.header}>
          <Heading>friends</Heading>
        </View>
        <TouchableOpacity style={[base.rightNav, styles.rightNavButton]} onPress={() => this.props.navigator.navigate('RandosScene')}>
          <Image source={require('../images/Plus.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        { this.state.loadingRequests ?
          <View style={{height: 50}}>
            <ActivityIndicator
              style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
              size="small"
              color={base.colors.mediumgrey}
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
              style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
              size="small"
              color={base.colors.mediumgrey}
            />
          </View>
        : !this.state.friends.length ?
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', paddingTop: 13, paddingBottom: 15, }}>
              <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center'}]}>
                floats works best when you’ve got{"\n"}your closest friends.
              </Text>
            </View>
            <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('RandosScene')}>
              <Text style={styles.emptyButtonText}>
                add friends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color3}]} onPress={() => this.copyToClipboard()}>
              <Text style={styles.emptyButtonText}>
                invite someone
              </Text>
            </TouchableOpacity>
          </View>
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
            <View style={[base.bgBreakingSection, {alignItems: 'center', justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: base.colors.lightgrey}]}>
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

  showLogoutDialog() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [`Logout`, `Delete Account`, 'Cancel'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 2,
    }, (index) => {
      if( index == 2 ) { return; }
      if( index == 0 ) {
        this.logout();
      }
      if( index == 1 ) {
        Alert.alert(
          'Delete Account',
          'Are you sure?',
          [
            {text: 'Yes, delete me.', onPress: () => this.deleteAccount()},
            {text: 'No', style: 'cancel'},
          ]
        )
      }
    })
  }
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
  emptyButtons: {
    width: 200,
    height: 50,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButtonText: {
    color: 'white',
    textAlign: 'center'
  },
});
