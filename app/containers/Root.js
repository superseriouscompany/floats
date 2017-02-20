import React from 'react';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@exponent/react-native-action-sheet';
import KillSwitchCtrl from '../containers/KillSwitchCtrl';
import PushCtrl from '../containers/PushCtrl';
import DeepLinkCtrl from '../containers/DeepLinkCtrl';
import LoginScene from '../components/LoginScene';
import AuthedCtrl from '../containers/AuthedCtrl';
import Scratch from '../components/Scratch';
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

const useScratch = false;

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
  }

  componentDidMount() {
    God.work(this.navigator);

    if( useScratch ) {
      this.setState({scene: 'Scratch'});
      return;
    }

    AsyncStorage.getItem('@floats:user').then((user) => {
      if( user ) {
        store.dispatch({type: 'login', user: JSON.parse(user)});
        this.setState({scene: 'AuthedScene'});
      } else {
        this.setState({scene: 'LoginScene'});
      }
    }).catch(function(err) {
      console.warn(err);
    });
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
          <KillSwitchCtrl>
            <DeepLinkCtrl>
              <PushCtrl>
                <View style={{flex: 1}}>
                  { this.state.scene == 'LoginScene' ?
                    <LoginScene navigator={this.navigator} />
                  : this.state.scene == 'Scratch' ?
                    <Scratch navigator={this.navigator} />
                  : !!this.state.scene ?
                    <AuthedCtrl scene={this.state.scene} navigator={this.navigator} />
                  :
                    null
                  }
                </View>
              </PushCtrl>
            </DeepLinkCtrl>
          </KillSwitchCtrl>
        </ActionSheetProvider>
      </Provider>
    )
  }
}

Root.childContextTypes = {
  store: React.PropTypes.object
}
