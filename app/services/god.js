// v obviously an anti-pattern...

import store from './store';
import api from './api';
import { fetchInvitations } from '../actions/invitations';
import { fetchMyFloats } from '../actions/myFloats';
import { fetchConvos } from '../actions/convos';

module.exports = {
  work: work
}

let lock = false;
let queue = [];

function work(navigator) {
  store.subscribe(function() {
    const state = store.getState();

    if( !state.user.access_token ) {
      console.warn("No user set");
      return;
    }

    if( state.dirty ) {
      lock = false;
    }

    load();

    // this is an abomination
    if( state.navigation.pendingRoute ) {
      navigator.navigate(state.navigation.pendingRoute);
      store.dispatch({
        type: 'navigation:success'
      })

      if( state.navigation.pendingRoute === 'MessagesScene' ) {
        const payload = state.navigation.pendingRoutePayload;
        store.dispatch({
          type: 'convos:activate',
          id: payload.id,
        })
        store.dispatch({
          type: 'dirty',
        })
      } else {
        store.dispatch({
          type: 'convos:deactivate',
        })
      }
    }
  })
}

function load() {
  if( lock ) { return Promise.resolve(); }
  lock = true;
  store.dispatch({
    type: 'clean'
  })
  return Promise.all([
    loadInvitations(),
    loadMyFloats(),
    loadConvos(),
    loadMessages(),
  ])
}

function loadInvitations() {
  return store.dispatch(fetchInvitations());
}

function loadMyFloats() {
  return store.dispatch(fetchMyFloats());
}

function loadConvos() {
  return store.dispatch(fetchConvos());
}

function loadMessages() {
  const state = store.getState();
  if( !state.convos.activeConvoId ) { return; }
  const convo = state.convos && state.convos.all && state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  })
  if( !convo ) { return console.warn('Active convo was not found. Maybe it was deleted or left?'); }
  const floatId = convo.float_id;
  const convoId = convo.id;

  store.dispatch({
    type: 'load:messages',
    convoId: convoId,
  })
  return api.messages.all(floatId, convoId).then(function(messages) {
    store.dispatch({
      type: 'load:messages:success',
      floatId: floatId,
      convoId: convoId,
      messages: messages,
    })
  }).catch(function(messages) {
    store.dispatch({
      type: 'load:messages:failure',
      floatId: floatId,
      convoId: convoId,
    });
  })
}
