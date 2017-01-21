const redux  = require('redux');

function store(state, action) {
  state = state || {};

  switch(action.type) {
    // login and logout
    case 'login':
      return {
        ...state,
        user: action.user,
      }
    // invitations
    case 'load:invitations':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          loading: true,
        },
      }
    case 'load:invitations:success':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          all: action.invitations,
          loading: false,
        }
      }
    case 'load:invitations:failure':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          loading: false,
          error: action.error,
        }
      }
    // my floats
    case 'load:myFloats':
      return {
        ...state,
        myFloats: {
          ...state.myFloats,
          loading: true,
        },
      }
    case 'load:myFloats:success':
      return {
        ...state,
        myFloats: {
          ...state.myFloats,
          all: action.floats,
          loading: false,
        }
      }
    case 'load:myFloats:failure':
      return {
        ...state,
        myFloats: {
          ...state.myFloats,
          loading: false,
          error: action.error,
        }
      }
    // convos
    case 'load:convos':
      return {
        ...state,
        convos: {
          ...state.convos,
          loading: true,
        },
      }
    case 'load:convos:success':
      return {
        ...state,
        convos: {
          ...state.convos,
          all: action.convos,
          loading: false,
        }
      }
    case 'load:convos:failure':
      return {
        ...state,
        convos: {
          ...state.convos,
          loading: false,
          error: action.error,
        }
      }
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
  invitations: {
    loading: false,
    error: null,
    all: [
      {
        id: 'abc123',
        user: {
          id: '',
          name: '',
          avatar_url: '',
        },
        created_at: +new Date,
        bumped: {
          loading: false,
          error: false,
        }
      }
    ]
  },
  floats: {
    loading: false,
    error: null,
    all: [
      {
        id: 'abc123',
        user_id: 'abc123',
        created_at: +new Date,
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
