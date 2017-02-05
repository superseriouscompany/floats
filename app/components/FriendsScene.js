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
import {persistStore} from 'redux-persist'
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class FriendsScene extends Component {
  constructor(props) {
    super(props);

    this.state = { showEnemies: false }
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
      <ScrollView
        refreshControl={<RefreshControl tintColor={base.colors.mediumlightgrey} refreshing={this.props.friendRequests.loading || this.props.friends.loading || false} onRefresh={this.props.refresh} colors={[base.colors.mediumlightgrey]}/>}>
        { this.props.friendRequests.items && this.props.friendRequests.items.length ?
          <View style={[base.bgBreakingSection, {paddingBottom: 16}]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{paddingTop: 10, color: base.colors.mediumgrey, fontSize: 12}}>{this.props.friendRequests.items.length} {this.props.friendRequests.items.length == 1 ? 'friend request' : 'friend requests'}</Text>
            </View>
            <View style={{marginTop: -10}}>
              {this.props.friendRequests.items.map((f, i) => (
                <FriendRequest key={i} friend={f.user} accept={this.props.accept} deny={this.props.deny}/>
              ))}
            </View>
          </View>
        : null
        }
        { this.props.friends.items && this.props.friends.items.length ?
          <View style={{paddingBottom: 15}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{paddingTop: 10, color: base.colors.mediumgrey, fontSize: 12}}>{this.props.friends.items.length} {this.props.friends.items.length == 1 ? 'friend' : 'friends'}</Text>
            </View>
            <View style={{marginTop: -15}}>
              { this.props.friends.items.map((f, i) => (
                <Friend friend={f} key={i} blockDialog={this.blockDialog.bind(this)}/>
              ))}
            </View>
          </View>
        : !this.props.friends.loading ?
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
          </View>
        : null }
        { this.props.friends.enemies && this.props.friends.enemies.length ?
          <View>
            <View style={[base.bgBreakingSection, {alignItems: 'center', justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: base.colors.lightgrey}]}>
              <Text style={[base.timestamp, {paddingTop: 9, paddingBottom: 10, color: base.colors.mediumgrey}]} onPress={() => this.setState({showEnemies: !this.state.showEnemies})}>
                {this.state.showEnemies ? 'hide' : 'show'} blocked
              </Text>
            </View>
            { this.state.showEnemies ?
              <View style={{paddingBottom: 15}}>
                {this.props.friends.enemies.map((e, i) => (
                  <Enemy enemy={e} key={i} unblockDialog={this.unblockDialog.bind(this)}/>
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
    this.props.showActionSheetWithOptions({
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

  blockDialog(id, name) {
    this.props.showActionSheetWithOptions({
      options: [`Block ${name}`, 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index === 1 ) { return; }
      this.props.block(id);
    })
  }

  unblockDialog(id, name) {
    this.props.showActionSheetWithOptions({
      options: [`Unblock ${name}`, 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index === 1 ) { return; }
      this.props.unblock(id);
    })
  }

  deleteAccount() {
    api.users.deleteAccount().then(() => {
      this.logout();
    }).catch(function(err) {
      console.error(err);
      alert("Sorry, something went wrong in deleting your account. Please try again or email support@superserious.co");
    })
  }

  logout() {
    AsyncStorage.removeItem('@floats:accessToken').then(() => {
      return AsyncStorage.removeItem('@floats:user')
    }).then(() => {
      persistStore(this.context.store, {storage: AsyncStorage}).purge();
      this.props.navigator.navigate('LoginScene');
    }).catch(function(err) {
      console.error(err);
      alert("Sorry, we couldn't log you out. Please try again.")
    })
  }
}

FriendsScene.propTypes = {
  accept:  React.PropTypes.func.isRequired,
  deny:    React.PropTypes.func.isRequired,
  block:   React.PropTypes.func.isRequired,
  unblock: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
}

FriendsScene.contextTypes = {
  store: React.PropTypes.object
}

export default connectActionSheet(FriendsScene);

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
