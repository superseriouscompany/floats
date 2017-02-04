'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import FCM from 'react-native-fcm';
import { Alert } from 'react-native';
import { fetchFriends } from '../actions/friends';
import { fetchFriendRequests } from '../actions/friendRequests';

class PushCtrl extends Component {
  componentWillMount() {
    FCM.on('notification', (notif) => {
      this.props.dispatch({type: 'dirty'});
      if( notif.convoId && this.props.convos.activeConvoId && notif.convoId == this.props.convos.activeConvoId ) {
        return;
      }

      if( notif.type == 'friends:new' ) {
        this.props.dispatch(fetchFriends());
      } else if( notif.type == 'friend_requests:new') {
        this.props.dispatch(fetchFriendRequests());
      }

      if(notif.opened_from_tray) {
        if( notif.type == 'floats:new' ) {
          return this.props.dispatch({
            type:  'navigation:queue',
            route: 'FloatsScene',
          });
        }

        if( notif.type == 'friends:new' ) {
          return this.props.dispatch({
            type: 'navigation:queue',
            route: 'FriendsScene',
          })
        }

        if( notif.type == 'friend_requests:new' ) {
          return this.props.dispatch({
            type: 'navigation:queue',
            route: 'FriendsScene',
          })
        }

        if( notif.type == 'messages:new' ) {
          const convo = this.props.convos && this.props.convos.all && this.props.convos.all.find((c) => {
            return c.id == notif.convoId
          })

          if( !convo ) {
            return this.props.dispatch({
              type: 'navigation:queue',
              route: 'FloatsScene',
            })
          }

          try {
            const message = JSON.parse(notif.message);
            this.props.dispatch({type: 'messages:append', message:      message, convoId: convo.id});
            this.props.dispatch({type: 'convos:changePreview', message: message, convoId: convo.id});
          } catch(err) {
            console.warn("Couldn't parse message", err);
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
    convos: state.convos,
  };
}

export default connect(mapStateToProps)(PushCtrl);
