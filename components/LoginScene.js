'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import api from '../services/api';
import base from '../styles/base';
import {
  AsyncStorage,
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

export default class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../images/Floats.jpg')}/>
      <View style={{alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 25}}>
        { this.state.awaitingLogin ?
          <ActivityIndicator color="hotpink" size="small" />
        :
          <LoginButton
            style={{height: 50, width: 200}}
            onLoginFinished={this.onLoginFinished.bind(this)}
            />
        }
        <Text style={{paddingTop: 15, paddingLeft: 25, paddingRight: 25, fontSize: base.fontSizes.small, color: base.colors.mediumgrey, textAlign: 'center'}}>
          Read our
          <Text onPress={() => this.openUrl('https://superseriouscompany.com/terms')} style={{fontSize: base.fontSizes.small, color: base.colors.mediumgrey}}> Terms of Service</Text> and
          <Text onPress={() => this.openUrl('https://superseriouscompany.com/privacy')} style={{fontSize: base.fontSizes.small, color: base.colors.mediumgrey}}> Privacy Policy</Text>
        </Text>
      </View>
    </View>
  )}

  openUrl(url) {
    Linking.openURL(url)
  }

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
      console.warn("got user", user);
      global.user = user;
      return AsyncStorage.setItem('@floats:user', JSON.stringify(user)).then(function() {
        return AsyncStorage.setItem('@floats:accessToken', user.access_token);
      })
    }).then(() => {
      this.props.navigator.navigate('CreateFloatScene');
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
