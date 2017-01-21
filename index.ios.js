/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import FCM from 'react-native-fcm'
import Component from './components/Component';
import CreateFloatScene from './components/CreateFloatScene';
import LoginScene from './components/LoginScene';
import FloatsScene from './components/FloatsScene';
import RandosScene from './components/RandosScene';
import FriendsScene from './components/FriendsScene';
import Scratch from './components/Scratch';
import Text from './components/Text';
import MessagesScene from './components/MessagesScene';
import api from './services/api';
import store from './services/store';
import God from './services/god';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  View,
} from 'react-native';

export default class batsignal extends Component {
  constructor(props) {
    super(props);
    this.state = { props: {}};

    this.navigator = {
      navigate: (component, props) => {
        let stateChange = { scene: component, props: props || {} };
        this.setState(stateChange);
      }
    }

    FCM.on('notification', (notif) => {
      Alert.alert(notif.aps.alert);
      if(notif.opened_from_tray){
        //app is open/resumed because user clicked banner
      }
    });

    AsyncStorage.getItem('@floats:user').then((user) => {
      if( user ) {
        store.dispatch({type: 'login', user: JSON.parse(user)});
        this.setState({scene: 'FloatsScene'});
      } else {
        this.setState({scene: 'LoginScene'});
      }
    }).catch(function(err) {
      console.warn(err);
    });

    God.work();
  }

  getChildContext() {
    return {
      store: store
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.scene == 'LoginScene' ?
          <LoginScene navigator={this.navigator} />
        : this.state.scene == 'CreateFloatScene' ?
          <CreateFloatScene navigator={this.navigator} />
        : this.state.scene == 'FloatsScene' ?
          <FloatsScene navigator={this.navigator} />
        : this.state.scene == 'FriendsScene' ?
          <FriendsScene navigator={this.navigator} />
        : this.state.scene == 'RandosScene' ?
          <RandosScene navigator={this.navigator} />
        : this.state.scene == 'MessagesScene' ?
          <MessagesScene navigator={this.navigator} />
        : this.state.scene == 'Scratch' ?
          <Scratch />
        : !!this.state.scene ?
          <Text style={{padding: 200}}>404</Text>
        :
          null
        }
      </View>
    )
  }
}

batsignal.childContextTypes = {
  store: React.PropTypes.object
}

AppRegistry.registerComponent('batsignal', () => batsignal);
