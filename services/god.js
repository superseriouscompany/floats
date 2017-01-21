// v obviously an anti-pattern...

const store = require('./store');
const api   = require('./api');

module.exports = {
  work: work
}

let waiting = {
  invitations: true,
  myFloats: true,
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
      type: 'load:invitations:error',
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
      type: 'load:myFloats:error',
      error: err.message,
    })
  })
}
