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
}

let queue = [];

function work() {
  store.subscribe(function() {
    const state = store.getState();

    if( !state.user.access_token ) {
      return;
    }

    // TODO: retry
    waiting.invitations && loadInvitations();
    waiting.myFloats && loadMyFloats();
    waiting.convos && loadConvos();
  })
}

function loadInvitations() {
  waiting.invitations = false;
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
  waiting.myFloats = false;
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
  waiting.convos = false;
  store.dispatch({
    type: 'load:convos',
  })
  api.convos.all().then(function(convos) {
    store.dispatch({
      type: 'load:convos:success',
      convos: convos,
    })
  }).catch(function(err) {
    store.dispatch({
      type: 'load:convos:failure',
      error: err.message,
    })
  })
}
