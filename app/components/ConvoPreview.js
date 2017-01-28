'use strict';

import React from 'react';
import moment from 'moment';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ConvoPreview extends Component {
  render() {
    const c = this.props.convo;

    if( this.props.isCreator && !c.message ) {
      return null;
    }

    return (
    <TouchableOpacity onPress={this.showConvo.bind(this)} style={{flex: 1}}>
      <View style={[styles.container, (this.props.doBottomBorder == 1) ? {paddingBottom: 0.5} : {paddingBottom: 0}]}>
        { this.props.unread ?
          <View style={styles.unread}></View>
        :
          null
        }
        { c.message ?
          <Image source={{url: c.message.user.avatar_url}} style={styles.photoCircle}/>
        :
          <Image source={{url: this.convoAvatar(c)}} style={styles.photoCircle} />
        }
        <View style={styles.message}>
          <Text style={styles.name} numberOfLines={1}>
            {this.convoName(c)}
          </Text>
          { c.message ?
            <Text style={styles.text} numberOfLines={1}>
              {c.message.user.name.split(' ')[0]}: {c.message.text }
            </Text>
          :
            <Text style={[styles.text, styles.prompt]} numberOfLines={1}>
              Send a direct message...
            </Text>
          }
        </View>
        <Image style={styles.rightArrow} source={require('../images/RightArrowLight.png')}/>
        { c.message ?
          <Text style={[base.timestamp, styles.time]}>
            { moment(c.message.created_at).format('h:mma') }
          </Text>
        : null
        }
      </View>
      {
        this.props.doBottomBorder == 1 ?
          <View style={styles.bottomBorder}></View>
        : null
      }
    </TouchableOpacity>
  )}

  showConvo() {
    this.context.store.dispatch({
      type: 'navigation:queue',
      route: 'MessagesScene',
      payload: this.props.convo,
    })
  }

  convoName(convo) {
    if( !convo.users ) {
      console.warn('No users present', convo);
      return 'Messages';
    }
    if( convo.users.length > 2 ) { return 'Everyone' }

    const user = this.context.store.getState().user;
    return convo.users[0].id == user.id
      ? convo.users[1].name
      : convo.users[0].name;
  }

  convoAvatar(convo) {
    if( !convo.users ) {
      console.warn('No users present', convo);
      return 'Messages';
    }

    const user = this.context.store.getState().user;
    return convo.users[0].id == user.id
      ? convo.users[1].avatar_url
      : convo.users[0].avatar_url;
  }
}

ConvoPreview.propTypes = {
  isCreator: React.PropTypes.bool.isRequired,
  convo: React.PropTypes.shape({
    message: React.PropTypes.shape({
      text: React.PropTypes.string,
      user: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        avatar_url: React.PropTypes.string,
      })
    })
  }).isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBorder: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
    marginLeft: 20,
  },
  message: {
    flex: 1,
  },
  time: {
    color: base.colors.mediumlightgrey,
    position: 'absolute',
    right: 10,
    bottom: 4,
    fontSize: 12,
  },
  text: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.small,
    paddingRight: 35,
  },
  prompt: {
    fontStyle: 'italic',
    color: 'hotpink',
  },
  photoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 16,
    marginBottom: 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
  },
  rightArrow: {
    marginLeft: 14,
    marginRight: 10,
    marginTop: -1
  },
  unread: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 8,
    height: 8,
    backgroundColor: base.colors.color3,
    borderRadius: 4,
  },
})

ConvoPreview.contextTypes = {
  store: React.PropTypes.object,
}
