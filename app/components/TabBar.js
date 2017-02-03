'use strict';

import React, {Component} from 'react';
import Text from './Text';
import base from '../styles/base';
import api from '../services/api';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist'
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class TabBar extends Component {
  render() { return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigator.navigate('FloatsScene')}>
        { this.props.active == 'floats' ?
          <Image source={require('../images/HeartActive.png')} />
        :
          <Image source={require('../images/Heart.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
        { this.props.active == 'createFloat' ?
          <Image source={require('../images/AirplaneActive.png')} />
        :
          <Image source={require('../images/Airplane.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => this.showLogoutDialog()}>
        { this.props.active == 'friends' ?
          <Image source={require('../images/ProfileActive.png')} />
        :
          <Image source={require('../images/Profile.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  showLogoutDialog() {
    //return this.props.navigator.navigate('FriendsScene')
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

TabBar.contextTypes = {
  store: React.PropTypes.object
}

export default connectActionSheet(TabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
    backgroundColor: 'white',
  },
  tabItem: {
    flex: .333,
    alignItems: 'center',
  }
})
