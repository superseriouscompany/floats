'use strict';

import React from 'react';
import moment from 'moment';
import Component from './Component';
import Text from './Text';
import ConvoPreview from './ConvoPreview';
import base from '../styles/base';
import api  from '../services/api';
import { connectActionSheet } from '@exponent/react-native-action-sheet';

import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Float extends Component {
  render() {
    const f         = this.props.float;
    const user      = this.context.store.getState().user;
    const isCreator = user.id === f.user.id;
    const mainChat  = extractMainChat(f);
    const sideChats = extractSideChats(f);

    return (
    <View>
      <View style={styles.top}>
        <Text style={[styles.timestamp, base.timestamp]}>
          { moment(f.created_at).format('h:mma') }
        </Text>
        <Image source={{uri: f.user.avatar_url}} style={base.photoCircle} />
        <TouchableOpacity onPress={this.showDialog.bind(this)} style={styles.garbage}>
          <Image source={require('../images/ThreeDotsLight.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text>
          {f.user.name.split(' ')[0]} floated: "
          <Text style={styles.title}>{f.title}</Text>
          "
        </Text>
      </View>
      <MainChatPreview {...this.props} chat={mainChat}/>
      <SideChats {...this.props} chats={sideChats} />
    </View>
  )}

  showDialog() {
    const isMine  = !!this.props.float.invitees;
    this.props.showActionSheetWithOptions({
      options: [isMine ? `Delete Float` : 'Leave Float', 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index == 1 ) { return; }
      if( isMine ) {
        Alert.alert(
          'Delete Float',
          'Are you sure?',
          [
            {text: 'Yes, delete it.', onPress: () => this.deleteFloat()},
            {text: 'No', style: 'cancel'},
          ]
        )
      } else {
        api.floats.leave(this.props.float.id).then(() => {
          this.context.store.dispatch({type: 'dirty'});
        }).catch(function(err) {
          console.error(err);
        })
      }
    })
  }

  deleteFloat() {
    return api.floats.destroy(this.props.float.id).then(() => {
      this.context.store.dispatch({type: 'dirty'});
    }).catch(function(err) {
      console.error(err);
    })
  }
}

class MainChatPreview extends Component {
  render() { return (
    <Text>Main chats</Text>
  )}
}

class SideChats extends Component {
  render() { return (
    <Text>Side chats</Text>
  )}
}

function extractMainChat(float) {
  if( !float.convos ) { return null; }
  const group = float.convos.find((c) => {
    return c.users.length > 2
  })

  return group || float.convos[0];
}

function extractSideChats(float) {
  if( !float.convos ) { return []; }

  return float.convos.filter((c) => {
    return c.users.length == 2
  })
}

export default connectActionSheet(Float);

Float.contextTypes = {
  store: React.PropTypes.object,
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 5,
  },
  rightQuote: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    position: 'absolute',
    left: -4,
    top: 1,
  },
  floatTitle: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    flex: 1,
    paddingTop: 1,
  },
  unanswered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
  },
})
