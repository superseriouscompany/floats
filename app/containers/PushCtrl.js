'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FCM from 'react-native-fcm'

class PushCtrl extends Component {
  componentWillMount() {
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
        if( notif.type == 'messages:new' ) {
          const convo = this.props.convos && this.props.convos.find((c) => {
            return c.id == notif.convoId
          })

          if( !convo ) {
            return this.props.dispatch({
              type: 'navigation:queue',
              route: 'FloatsScene',
            })
          }

          return this.props.dispatch({
            type: 'navigation:queue',
            route: 'MessagesScene',
            payload: convo,
          })
        }
        return console.warn(JSON.stringify(notif));
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
    convos: state.convos.all,
  };
}

export default connect(mapStateToProps)(PushCtrl);
