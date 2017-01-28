'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MessagesScene from '../components/MessagesScene'

class MessagesCtrl extends Component {
  render() { return (
    <MessagesScene {...this.props} />
  )}
}

function mapStateToProps(state) {
  const convo = state.convos.all && state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  });
  const name = convo.users[0].id == state.user.id
    ? convo.users[1].name : convo.users[0].name

  const messages = state.messages[state.convos.activeConvoId];
  const items = messages.all || [];

  if( !items.length && isPrimary(state, convo) ) {
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
