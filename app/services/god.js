// v obviously an anti-pattern...

const store = require('./store');
const api   = require('./api');

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

function loadMessages() {
  const state = store.getState();
  if( !state.convos.activeConvoId ) { return; }
  const convo = state.convos.all.find(function(c) {
    return c.id == state.convos.activeConvoId;
  })
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
