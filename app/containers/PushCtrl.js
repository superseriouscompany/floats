'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FCM from 'react-native-fcm'

class PushCtrl extends Component {
  componentDidMount() {
    FCM.on('notification', (notif) => {
      this.props.dispatch({type: 'dirty'});
      if( notif.convoId && this.props.convos.activeConvoId && notif.convoId == this.props.convos.activeConvoId ) {
        return;
      }

      if(notif.opened_from_tray){
        if( notif.type == 'floats:new' ) {
          return this.props.dispatch({
            type:  'navigation:queue',
            route: 'FloatsScene',
          });
        }
        console.warn(JSON.stringify(notif));
        return;
      }

      if( notif.aps ) {
        Alert.alert(notif.aps.alert);
      } else if( notif.body ){
        Alert.alert(notif.body);
      } else if( notif.fcm && notif.fcm.body ){
        Alert.alert(notif.fcm.body);
      } else {
        console.warn("Unknown notification", notif);
      }
    });
  }

  render() { return (
    this.props.children
  )}
}

function mapStateToProps(state) {
  return {
    convos: state.convos,
  };
}

export default connect(mapStateToProps)(PushCtrl);
