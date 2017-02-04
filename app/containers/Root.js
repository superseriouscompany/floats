import React from 'react';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@exponent/react-native-action-sheet';
import CreateFloatScene from '../containers/CreateFloatCtrl';
import FloatsScene from '../containers/FloatsCtrl';
import MessagesScene from '../containers/MessagesCtrl';
import KillSwitchScene from '../containers/KillSwitchCtrl';
import FriendsCtrl from '../containers/FriendsCtrl';
import PushCtrl from '../containers/PushCtrl';
import LoginScene from '../components/LoginScene';
import RandosScene from '../components/RandosScene';
import Scratch from '../components/Scratch';
import Text from '../components/Text';
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

var defaultScene = 'CreateFloatScene';

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
          <KillSwitchScene>
            <PushCtrl>
              <View style={{flex: 1}}>
                { this.state.scene == 'LoginScene' ?
                  <LoginScene navigator={this.navigator} />
                : this.state.scene == 'CreateFloatScene' ?
                  <CreateFloatScene navigator={this.navigator} />
                : this.state.scene == 'FloatsScene' ?
                  <FloatsScene navigator={this.navigator} />
                : this.state.scene == 'FriendsScene' ?
                  <FriendsCtrl navigator={this.navigator} />
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
            </PushCtrl>
          </KillSwitchScene>
        </ActionSheetProvider>
      </Provider>
    )
  }
}

Root.childContextTypes = {
  store: React.PropTypes.object
}
