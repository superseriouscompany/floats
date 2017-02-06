'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MessagesScene from '../components/MessagesScene';
import {send} from '../actions/messages'
import api from '../services/api';
import branch from 'react-native-branch';
import {
  BackAndroid,
  Platform,
  Share,
} from 'react-native'

class MessagesCtrl extends Component {
  constructor(props) {
    super(props)
    this.back         = this.back.bind(this)
    this.send         = this.send.bind(this)
    this.inviteDialog = this.inviteDialog.bind(this)
    this.isSharing    = false;
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.back);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }

  back() {
    this.props.dispatch({type: 'navigation:queue', route: 'FloatsScene'});
    return true;
  }

  send(message) {
    if( !this.props.convo ) {
      console.error("No active convo", this.props); alert('Message failed to send to convo');
    }

    const pendingMessage = {
      ...message,
      user: this.props.user,
      created_at: +new Date,
      id: `pending${Math.random()}`
    }

    this.props.dispatch(send(this.props.convo, message, pendingMessage));
  }

  inviteDialog() {
    if( !this.props.user || !this.props.user.id ) {
      console.warn("No user set", JSON.stringify(this.props));
    }
    if( !this.props.float || !this.props.float.id ) {
      console.warn("No float set", JSON.stringify(this.props));
    }
    if( this.isSharing ) { return; }
    this.isSharing = true;

    let branchUniversalObject = branch.createBranchUniversalObject(
      `floats/${this.props.float.id}/invite/${this.props.user.id}`,
      {
        metadata: {
          inviter_id:  this.props.user.id,
          float_id:    this.props.float.id,
          float_token: this.props.float.token,
        }
      }
    )

    let linkProperties = {
      feature: 'float-invitation',
      channel: 'app'
    }

    let controlParams = {
      '$ios_deepview': 'floats_deepview_vk8d',
      '$og_title': this.props.float.title,
    }

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
      this.isSharing = false;

      return Share.share({
        message: Platform.OS == 'android' ? `${this.props.float.title} ${payload.url}` : this.props.float.title,
        url: payload.url,
      }, {
        dialogTitle: 'Add friends',
        tintColor: 'blue'
      })
    }).then((result) => {
      this.isSharing = false;
    }).catch((error) => {
      this.isSharing = false;
      console.error(error);
      alert(error.message);
    })
  }

  render() { return (
    <MessagesScene
      {...this.props}
      back={this.back}
      send={this.send}
      inviteDialog={this.inviteDialog}/>
  )}
}

function mapStateToProps(state) {
  const convo = state.convos.all && state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  });

  if( !convo ) { console.warn("Couldn't find convo", JSON.stringify(state.convos)); return {} }

  const messages = state.messages[state.convos.activeConvoId];
  const items = messages && messages.all ? [].concat(messages.all) : [];

  let float;
  if( isPrimary(state, convo) ) {
    float = state.myFloats.all.find((f) => {
      return f.id === convo.float_id
    })

    float = float || state.invitations.all.find((f) => {
      return f.id === convo.float_id
    })

    if( !float ) {
      console.warn("Couldn't find float", convo.float_id);
    } else {
      items.push({
        id: 'mock',
        text: float.title,
        user: float.user,
        created_at: float.created_at,
      })
    }
  }

  const isGroup = convo.users.length > 2;
  const otherName = convo.users[0].id == state.user.id
    ? convo.users[1].name : convo.users[0].name;
  const name = isGroup ? float && float.title || 'Group Message' : otherName;

  return({
    loading:   messages.loading,
    error:     messages.error,
    messages:  items.map(decorate),
    user:      state.user,
    name:      name,
    convo:     convo,
    float:     float,
    isPrimary: isPrimary(state, convo),
    isGroup:   isGroup,
  })
}

function decorate(message) {
  return {
    _id: message.id,
    text: message.text,
    createdAt: new Date(message.created_at),
    user: {
      _id: message.user.id,
      name: message.user.name,
      avatar: message.user.avatar_url,
    }
  }
}

function isPrimary(state, convo) {
  if( convo.users.length > 2 ) { return true; }
  const otherConvos = state.convos.all.filter((c) => {
    return c.float_id === convo.float_id
  })

  return otherConvos.length == 1;
}

export default connect(mapStateToProps)(MessagesCtrl);
