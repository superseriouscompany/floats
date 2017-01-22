// v obviously an anti-pattern...

const store = require('./store');
const api   = require('./api');

module.exports = {
  work: work
}

let lock = false;
let messagesLock = false;
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

    if( !lock ) {
      load();
    }

    // this is an abomination
    if( state.pendingRoute ) {
      navigator.navigate(state.pendingRoute);
      if( state.pendingRoute === 'MessagesScene' ) {
        const payload = state.pendingRoutePayload;

        loadMessages(payload.float_id, payload.id).then(function() {
          store.dispatch({
            type: 'navigation:success'
          })
          store.dispatch({
            type: 'convos:activate',
            id: payload.id,
          })
          messagesLock = false;
        }).catch(function() {
          store.dispatch({
            type: 'navigation:success'
          })
          store.dispatch({
            type: 'convos:activate',
            id: payload.id,
          })
          messagesLock = false;
        })
      } else {
        store.dispatch({
          type: 'navigation:success',
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
  ])
}

function loadInvitations() {
  store.dispatch({
    type: 'load:invitations',
  })
  api.floats.invites().then(function(invitations) {
    store.dispatch({
      type: 'load:invitations:success',
      invitations: invitations,
    })
  }).catch(function(err) {
    store.dispatch({
      type: 'load:invitations:failure',
      error: err.message,
    })
  })
}

function loadMyFloats() {
  store.dispatch({
    type: 'load:myFloats',
  })
  api.floats.mine().then(function(floats) {
    store.dispatch({
      type: 'load:myFloats:success',
      floats: floats,
    })
  }).catch(function(err) {
    store.dispatch({
      type: 'load:myFloats:failure',
      error: err.message,
    })
  })
}

function loadConvos() {
  store.dispatch({
    type: 'load:convos',
  })
  api.convos.all().then(function(convos) {
    store.dispatch({
      type: 'load:convos:success',
      convos: convos,
    });
  }).catch(function(err) {
    store.dispatch({
      type: 'load:convos:failure',
      error: err.message,
    });
  })
}

function loadMessages(floatId, convoId) {
  if( messagesLock ) { return Promise.resolve(); }
  messagesLock = true;

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

// const ws = new WebSocket('ws://192.168.1.72:3001');
//
// ws.onopen = () => {
//   // connection opened
//   ws.send('something'); // send a message
// };
//
// ws.onmessage = (e) => {
//   // a message was received
//   console.warn('received message', e.data);
//   this.appendMessage(e.data);
// };
//
// ws.onerror = (e) => {
//   // an error occurred
//   console.warn(e.message);
// };
//
// ws.onclose = (e) => {
//   // connection closed
//   console.warn(e.code, e.reason);
// };
