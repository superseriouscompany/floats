'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import api from '../services/api';
import {
  View,
  requireNativeComponent,
  NativeAppEventEmitter,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

export default class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.login();
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{justifyContent: 'center', flex: 0.8}}>
        <Text style={{color: 'red'}} onPress={() => this.props.navigator.navigate('NearbyFriendsScene')}>|U|</Text>
      </View>
      <View style={{justifyContent: 'center', flex: 0.2}}>
        { this.state.awaitingLogin ?
          <ActivityIndicator color="hotpink" size="small" />
        :
          <LoginButton
            onLoginFinished={this.onLoginFinished.bind(this)}
            onLogoutFinished={() => alert("logout.")}/>
        }
      </View>
    </View>
  )}

  onLoginFinished(error, result) {
    if (error) {
      return alert("Login error: " + result.error);
    } else if (result.isCancelled) {
      console.warn("Login cancelled");
    }

    this.login();
  }

  login() {
    AccessToken.getCurrentAccessToken().then((data) => {
      if( !data ) { throw new Error('nope'); }
      console.log("access token is", data);
      return api.sessions.create(data.accessToken.toString())
    }).then((user) => {
      return AsyncStorage.setItem('@floats:accessToken', user.access_token);
      this.context.store.dispatch({type: 'login', accessToken: user.access_token});
    }).then(() => {
      this.props.navigator.navigate('NearbyFriendsScene');
    }).catch(function(err) {
      if( err.message == 'nope' ) { return; }
      console.error(err);
    });
  }
}

LoginScene.propTypes = {
  navigator: React.PropTypes.object.isRequired,
}
LoginScene.contextTypes = {
  store: React.PropTypes.object
}
