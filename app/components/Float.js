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
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={[styles.timestamp, base.timestamp]}>
            { moment(f.created_at).format('h:mma') }
          </Text>
          <Image source={{uri: f.user.avatar_url}} style={base.photoCircle} />
          <TouchableOpacity onPress={this.showDialog.bind(this)} style={styles.garbage}>
            <Image source={require('../images/ThreeDotsLight.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          { f.user.id == user.id ?
            'You '
          :
            f.user.name.split(' ')[0] + ' '
          }
          floated: "{f.title}"
        </Text>
        <ConvoPreview {...this.props} isMain={true} convo={mainChat} user={user} isCreator={isCreator}/>
        <SideChats {...this.props} chats={sideChats} user={user} isCreator={isCreator}/>
      </View>
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
          alert(err.message);
        })
      }
    })
  }

  deleteFloat() {
    return api.floats.destroy(this.props.float.id).then(() => {
      this.context.store.dispatch({type: 'dirty'});
    }).catch(function(err) {
      console.error(err);
      alert(err.message);
    })
  }
}

class SideChats extends Component {
  render() {
    const {convos} = this.props;
    if( !convos || !convos.length ) { return null; }
    return (
      <View style={styles.sideChats}>
        { convos.map((c, key) => (
          <ConvoPreview convo={c} isMain={false} user={this.props.user} isCreator={this.props.isCreator} key={key} doBottomBorder={key != convos.length - 1}/>
        ))}
      </View>
    )
  }
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
  container: {
    padding: 20,
  },

  main: {
    shadowColor: 'hotpink',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    borderRadius: 20,
    padding: 15,
  },

  timestamp: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  garbage: {
    position: 'absolute',
    right: 0,
    top: 0,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  title: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.big,
    lineHeight: 28,
    marginBottom: 50,
  },
})
