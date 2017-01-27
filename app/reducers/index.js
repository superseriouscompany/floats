'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const middleware = [thunk];
if( __DEV__ ) {
  middleware.push(createLogger());
}

module.exports = createStore(
  reducer,
  applyMiddleware(...middleware),
);

function reducer(state, action) {
  state = state || {};

  switch(action.type) {
    case 'nearbyFriends:load':
      return {
        ...state,
        nearbyFriends: {
          loading: true,
          error: null,
        }
      }
    case 'nearbyFriends:load:yes':
      return {
        ...state,
        nearbyFriends: {
          loading: false,
          items: action.friends,
        }
      }
    case 'nearbyFriends:load:no':
      return {
        ...state,
        nearbyFriends: {
          loading: false,
          error: action.error,
        }
      }
    // login and logout
    case 'login':
      return {
        ...state,
        user: action.user,
      }
    case 'clean':
      return {
        ...state,
        dirty: false,
      }
    case 'dirty':
      return {
        ...state,
        dirty: true,
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
    case 'convos:activate':
      return {
        ...state,
        activeConvoId: action.id,
      }
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
      messages[action.convoId].all = action.messages;
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

//
//
// Example state:
//
//
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
    id: '',
    access_token: '',
    avatar_url: '',
    name: '',
    facebook_id: '',
    facebook_access_token: '',
  },
  activeConvoId: '',
  invitations: {
    loading: false,
    error: null,
    all: [float, float],
  },
  convos: {
    loading: false,
    error: null,
    all: [convo, convo, convo],
  },
  floats: {
    loading: false,
    error: null,
    all: [float, float]
  },
  messages: {
    oneConvoId: {
      loading: false,
      error: null,
      all: [message, message, message],
    },
    anotherConvoId: {
      loading: false,
      error: null,
      all: [],
    }
  }
}

const user = {
  id: '',
  name: '',
  avatar_url: '',
}

const convo = {
  id: 'abc123',
  message: {
    created_at: +new Date,
    text: '',
    user: user
  },
  unread: false,
}

const float = {
  id: '',
  title: '',
  user: user,
  created_at: +new Date,
}

const message = {
  text: '',
  created_at: +new Date,
  type: '',
  user: user,
}
