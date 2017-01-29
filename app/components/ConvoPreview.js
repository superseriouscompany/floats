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
    <TouchableOpacity onPress={this.showConvo.bind(this)}>
      <View style={styles.faces}>
        { c.users.length == 2 ?
          <Image source={{uri: this.convoAvatar(c)}} style={base.miniPhotoCircle} />
        : c.users.map((u, key) => (
          <Image source={{uri: u.avatar_url}} style={[base.miniPhotoCircle, styles.face]} key={key}/>
        ))}
      </View>
      { c.message ?
        <View style={styles.latest}>
          <View style={styles.left}>
            <View style={{flexDirection: 'row'}}>
              { this.props.unread ?
                <View style={styles.unread}></View>
              :
                null
              }
              <Text style={base.timestamp}>{ moment(c.message.created_at).format('h:mma') }</Text>
            </View>
            <Text style={styles.text} numberOfLines={1}>
              {this.convoSpeaker.bind(this)(c.message)}: {c.message.text}
            </Text>
          </View>
          <Image style={styles.rightArrow} source={require('../images/RightArrowLight.png')}/>
        </View>
      :
        <Text style={styles.prompt}>Message the group</Text>
      }
    </TouchableOpacity>
    )
  }

  showConvo() {
    this.context.store.dispatch({
      type: 'navigation:queue',
      route: 'MessagesScene',
      payload: this.props.convo,
    })
  }

  convoSpeaker(message) {
    return this.props.user.id == message.user.id ?
      'You' : message.user.name.split(' ')[0];
  }

  convoName(convo) {
    if( !convo.users ) {
      console.warn('No users present', convo);
      return 'Messages';
    }
    if( convo.users.length > 2 ) { return 'Group Chat' }

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
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    avatar_url: React.PropTypes.string,
  }),
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
  faces: {
    flexDirection: 'row',
  },
  face: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  latest: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  text: {
    color: base.colors.mediumgrey,
  },
  prompt: {
    fontSize: base.fontSizes.normal,
    textAlign: 'center',
    padding: 20,
  },
  rightArrow: {
  },
})

ConvoPreview.contextTypes = {
  store: React.PropTypes.object,
}
