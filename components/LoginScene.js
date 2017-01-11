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
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

export default class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.successSubscription = NativeAppEventEmitter.addListener('FBLoginSuccess', (accessToken) => {
      this.setState({awaitingLogin: true})
      api.sessions.create(accessToken).then((user) => {
        console.log("Logged in. Access token: ", user.access_token);
        this.props.navigator.navigate('FriendsScene');
      }).catch(function(err) {
        this.setState({awaitingLogin: false})
        alert(err);
        console.error(err);
      })
    });

    this.failureSubscription = NativeAppEventEmitter.addListener('FBLoginFailure', (err) => {
      alert(err);
      console.error(err);
    })
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{justifyContent: 'center', flex: 0.8}}>
        <Text style={{color: 'red'}} onPress={() => this.props.navigator.navigate('FriendsScene')}>|U|</Text>
      </View>
      <View style={{justifyContent: 'center', flex: 0.2}}>
        { this.state.awaitingLogin ?
          <ActivityIndicator color="hotpink" size="small" />
        :
          <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      alert(data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        }
      </View>
    </View>
  )}

  componentWillUnmount() {
    this.successSubscription.remove();
    this.failureSubscription.remove();
  }
}

LoginScene.propTypes = {
  navigator: React.PropTypes.object.isRequired,
}
