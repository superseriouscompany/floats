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
    // messages
    case 'load:messages':
      var messages = {
        ...state.messages
      }
      messages[action.convoId] = messages[action.convoId] || {};
      messages[action.convoId].loading = true;
      return {
        ...state,
        messages: messages,
      }
    case 'load:messages:success':
      var messages = {
        ...state.messages
      };
      messages[action.convoId] = action.messages;
      return {
        ...state,
        messages: messages,
      }

    // navigation
    case 'navigation:queue':
      return {
        ...state,
        pendingRoute: action.route,
        pendingRoutePayload: action.payload,
      }
    case 'navigation:success':
      return {
        ...state,
        pendingRoute: null,
        pendingRoutePayload: null,
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
  navigation: {
    pendingRoute: 'MessagesScene',
    pendingRoutePayload: {
      id: '',
      float_id: '',
      etc: '',
    }
  },
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
  convos: {
    loading: false,
    error: null,
    all: [
      {
        id: 'abc123',
        message: {
          created_at: +new Date,
          text: '',
          user: {
            avatar_url: '',
            name: '',
          }
        },
        unread: false,
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
      }
    ],
  },
  messages: {
    oneConvoId: {
      loading: false,
      error: null,
      all: [
        {
          text: '',
          created_at: +new Date,
          type: '',
          user: {
            id: '',
            avatar_url: '',
            name: '',
          }
        }
      ]
    },
    secondConvoId: {}
  }
}
