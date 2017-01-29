'use strict';

import api from '../services/api'

export function send(convo, message, pendingMessage) {
  return function(dispatch) {
    dispatch({type: 'messages:append', message:      pendingMessage, convoId: convo.id});
    dispatch({type: 'convos:changePreview', message: pendingMessage, convoId: convo.id});
    api.messages.create(convo.float_id, convo.id, message.text).then(function(m) {
      dispatch({type: 'dirty'});
    }).catch(function(err) {
      dispatch({type: 'message:send:no'});
      console.error(err);
      alert("Message failed to send");
    });
  }
}
