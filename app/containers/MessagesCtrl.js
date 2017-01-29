'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MessagesScene from '../components/MessagesScene';
import {send} from '../actions/messages'
import api from '../services/api';

class MessagesCtrl extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
    this.send = this.send.bind(this)
  }

  back() {
    this.props.dispatch({type: 'navigation:queue', route: 'FloatsScene'});
  }

  send(message) {
    if( !this.props.convo ) {
      console.error("No active convo", this.props); alert('Message failed to send to convo');
    }

    const pendingMessage = {
      ...message,
      user: this.props.user,
      created_at: +new Date,
      id: 'pending'
    }

    this.props.dispatch(send(this.props.convo, message, pendingMessage));
  }

  render() { return (
    <MessagesScene {...this.props} back={this.back} send={this.send}/>
  )}
}

function mapStateToProps(state) {
  const convo = state.convos.all && state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  });
  const name = convo.users[0].id == state.user.id
    ? convo.users[1].name : convo.users[0].name

  const messages = state.messages[state.convos.activeConvoId];
  const items = messages.all ? [].concat(messages.all) : [];

  if( isPrimary(state, convo) ) {
    let float = state.myFloats.all.find((f) => {
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

  return({
    loading:  messages.loading,
    error:    messages.error,
    messages: items.map(decorate),
    user:     state.user,
    name:     name,
    convo:    convo,
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
