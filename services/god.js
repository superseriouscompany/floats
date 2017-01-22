// v obviously an anti-pattern...

const store = require('./store');
const api   = require('./api');

module.exports = {
  work: work
}

let waiting = {
  invitations: true,
  myFloats: true,
  convos: true,
  messages: true,
}

let queue = [];

function work(navigator) {
  store.subscribe(function() {
    const state = store.getState();

    if( !state.user.access_token ) {
      return;
    }

    waiting.invitations && loadInvitations();
    waiting.myFloats && loadMyFloats();
    waiting.convos && loadConvos();

    if( state.pendingRoute ) {
      navigator.navigate(state.pendingRoute);
      if( state.pendingRoute === 'MessagesScene' ) {
        const payload = state.pendingRoutePayload;
        const promise = waiting.messages
          ? loadMessages(payload.float_id, payload.id)
          : Promise.resolve(true);

        promise.then(function() {
          store.dispatch({
            type: 'navigation:success'
          })
        }).catch(function() {
          store.dispatch({
            type: 'navigation:success'
          })
        })
      } else {
        store.dispatch({
          type: 'navigation:success',
        })
      }
    }
  })
}

function loadInvitations() {
  waiting.invitations = false;
  store.dispatch({
    type: 'load:invitations',
  })
  api.floats.invites().then(function(invitations) {
    waiting.invitations = false;
    store.dispatch({
      type: 'load:invitations:success',
      invitations: invitations,
    })
  }).catch(function(err) {
    waiting.invitations = false;
    store.dispatch({
      type: 'load:invitations:failure',
      error: err.message,
    })
  })
}

function loadMyFloats() {
  waiting.myFloats = false;
  store.dispatch({
    type: 'load:myFloats',
  })
  api.floats.mine().then(function(floats) {
    store.dispatch({
      type: 'load:myFloats:success',
      floats: floats,
    })
    waiting.myFloats = false;
  }).catch(function(err) {
    store.dispatch({
      type: 'load:myFloats:failure',
      error: err.message,
    })
    waiting.myFloats = false;
  })
}

function loadConvos() {
  waiting.convos = false;
  store.dispatch({
    type: 'load:convos',
  })
  api.convos.all().then(function(convos) {
    store.dispatch({
      type: 'load:convos:success',
      convos: convos,
    });
    waiting.convos = false;
  }).catch(function(err) {
    store.dispatch({
      type: 'load:convos:failure',
      error: err.message,
    });
    waiting.convos = false;
  })
}

function loadMessages(floatId, convoId) {
  waiting.messages = false;
  store.dispatch({
    type: 'load:messages',
  })
  return api.messages.all(floatId, convoId).then(function(messages) {
    store.dispatch({
      type: 'load:messages:success',
      floatId: floatId,
      convoId: convoId,
      messages: messages,
    })
    waiting.messages = false;
  }).catch(function(messages) {
    store.dispatch({
      type: 'load:messages:failure',
      floatId: floatId,
      convoId: convoId,
    });
    waiting.messages = false;
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
