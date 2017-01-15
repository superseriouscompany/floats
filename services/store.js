const redux  = require('redux');

function store(state, action) {
  console.log('Dispatched', state, action);
  state = state || {};

  switch(action.type) {
    case 'login':
      state.accessToken = action.accessToken;
      return state;
    case 'loadNearbyFriends':
      state.friends = action.friends;
      return state;
    case 'removeInvitee':
      state.invitees = state.invitees.filter(function(i) {
        return i.id != action.friend.id
      })
      return state;
    case 'addInvitee':
      state.invitees = state.invitees.concat([action.friend]);
      return state;
    case 'addAllInvitees':
      state.invitees = [].concat(state.friends);
      return state;
    case 'removeAllInvitees':
      state.invitees = [];
      return state;
    case '@@redux/INIT':
      return state;
    default:
      console.warn("Unknown action type", action.type);
      return state;
  }
}

module.exports = redux.createStore(store);
