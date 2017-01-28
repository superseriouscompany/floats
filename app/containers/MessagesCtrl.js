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
  const messages = state.messages[state.convos.activeConvoId];
  const convo = state.convos.all && state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  });
  const name = convo.users[0].id == state.user.id
    ? convo.users[1].name : convo.users[0].name

  return({
    loading:  messages.loading,
    error:    messages.error,
    messages: (messages.all || []).map(decorate),
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

export default connect(mapStateToProps)(MessagesCtrl);
