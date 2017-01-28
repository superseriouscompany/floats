import React from 'react';
import FCM from 'react-native-fcm'
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@exponent/react-native-action-sheet';
import CreateFloatScene from '../containers/CreateFloatCtrl';
import FloatsScene from '../containers/FloatsCtrl';
import MessagesScene from '../containers/MessagesCtrl';
import LoginScene from '../components/LoginScene';
import RandosScene from '../components/RandosScene';
import FriendsScene from '../components/FriendsScene';
import Scratch from '../components/Scratch';
import Text from '../components/Text';
import KillSwitchScene from '../components/KillSwitchScene';
import api from '../services/api';
import store from '../services/store';
import God from '../services/god';
import Component from '../components/Component';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  View,
} from 'react-native';

var defaultScene = 'FloatsScene';

export default class Root extends Component {
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
      store.dispatch({type: 'dirty'});
      const state = store.getState();
      if( notif.convoId && state.convos.activeConvoId && notif.convoId == state.convos.activeConvoId ) {
        return;
      }

      if( notif.aps ) {
        Alert.alert(notif.aps.alert);
      } else if( notif.body ){
        Alert.alert(notif.body);
      } else if( notif.fcm ){
        Alert.alert(notif.fcm.body);
      } else {
        console.warn("Unknown notification", notif);
      }
      if(notif.opened_from_tray){
        //app is open/resumed because user clicked banner
      }
    });

    AsyncStorage.getItem('@floats:user').then((user) => {
      if( user ) {
        store.dispatch({type: 'login', user: JSON.parse(user)});
        this.setState({scene: defaultScene});
      } else {
        this.setState({scene: 'LoginScene'});
      }
    }).catch(function(err) {
      console.warn(err);
    });

    God.work(this.navigator);
  }

  getChildContext() {
    return {
      store: store
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ActionSheetProvider>
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
            : this.state.scene == 'KillSwitchScene' ?
              <KillSwitchScene navigator={this.navigator} />
            : this.state.scene == 'Scratch' ?
              <Scratch />
            : !!this.state.scene ?
              <Text style={{padding: 200}}>404</Text>
            :
              null
            }
          </View>
        </ActionSheetProvider>
      </Provider>
    )
  }
}

Root.childContextTypes = {
  store: React.PropTypes.object
}
