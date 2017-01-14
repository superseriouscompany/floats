const redux  = require('redux');

function store(state, action) {
  console.log('Dispatched', state, action);
  state = state || {};

  switch(action.type) {
    case 'login':
      state.accessToken = action.accessToken;
      return state;
    case '@@redux/INIT':
      return state;
    default:
      console.warn("Unknown action type", action.type);
      return state;
  }
}

module.exports = redux.createStore(store);
