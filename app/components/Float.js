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
      <View style={styles.float}>
        <View style={styles.main}>
          <View style={{position: 'absolute', left: 0, right: 0, top: 9, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: f.user.avatar_url}} style={styles.organizerPhotoCircle} />
          </View>
          <View style={styles.top}>
            <Text style={[styles.topTimestamp, base.timestamp]}>
              { moment(f.created_at).format('h:mma') }
            </Text>
            <TouchableOpacity onPress={this.showDialog.bind(this)} style={styles.garbage}>
              <Image source={require('../images/GarbageCan.png')} />
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
        </View>
        <SideChats {...this.props} convos={sideChats} user={user} isCreator={isCreator}/>
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
    const cs = convos.filter((c) => {
      return !this.props.isCreator || c.message
    })

    if( !cs || !cs.length ) { return null; }
    return (
      <View>
        {cs.map((c, key) => (
          <View style={styles.sideChat} key={key}>
            <ConvoPreview convo={c} isMain={false} user={this.props.user} isCreator={this.props.isCreator}/>
          </View>
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
  if( !float.convos || float.convos.length == 1 ) { return []; }

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
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 14,
  },

  float: {
    shadowColor: '#ACAAA7',
    shadowRadius: 3,
    shadowOpacity: 0.49,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 4,
    backgroundColor: 'white',
  },

  main: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 9,
    paddingBottom: 15,
  },

  sideChat: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },

  topTimestamp: {
    color: base.colors.mediumlightgrey,
    fontSize: 12,
    marginTop: 39,
  },

  garbage: {
  },

  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  title: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.normal,
    lineHeight: 26,
    marginTop: 5,
  },

  organizerPhotoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: base.colors.lightgrey,
  },
})
