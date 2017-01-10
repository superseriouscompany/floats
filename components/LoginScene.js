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

const LoginButton = requireNativeComponent('RCTFBLogin', null);

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
          <LoginButton style={{width: 180, height: 40}}></LoginButton>
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
