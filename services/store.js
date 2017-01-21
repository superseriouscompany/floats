const redux  = require('redux');

function store(state, action) {
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

const example = {
  user: {
    loading: false,
    error: null,
    access_token: 'abc123',
    avatar_url: '',
    name: '',
    facebook_id: '',
    facebook_access_token: '',
  },
  floats: {
    loading: false,
    error: null,
    all: [
      {
        id: 'abc123',
        user_id: 'abc123',
        created_at: +new Date,
        bumped: {
          loading: false,
          error: null,
          yes: true,
        },
        convos: {
          loading: false,
          error: null,
          all: [
            {
              id: 'abc123',
              last_sent_at: +new Date,
              last_message_text: 'Hello world',
              unread: false,
              members: [{
                id: '',
                name: '',
                avatar_url: '',
              }],
              messages: {
                loading: false,
                error: null,
                all: [{
                  type: 'new_message',
                  text: 'Hello world',
                  created_at: +new Date,
                  convo_id: 'abc123',
                  float_id: 'abc123',
                  user: {
                    id: '',
                    name: '',
                    avatar_url: '',
                  }
                }]
              }
            },
          ]
        }
      }
    ],
  }
}
