'use strict';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, autoRehydrate } from 'redux-persist';
import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import nearbyFriends from './nearbyFriends';
import user from './user';
import invitations from './invitations';
import dirty from './dirty';
import myFloats from './myFloats';
import messages from './messages';
import convos from './convos';
import navigation from './navigation';
import killed from './killSwitch'
import friends from './friends'
import friendRequests from './friendRequests'
import deeplinks from './deeplinks'
import activityPrompt from './activityPrompt'

const middleware = [thunk];
if( __DEV__ ) {
  middleware.push(createLogger());
}
const reducers = combineReducers({
  nearbyFriends,
  user,
  invitations,
  dirty,
  myFloats,
  messages,
  convos,
  navigation,
  killed,
  friends,
  friendRequests,
  deeplinks,
  activityPrompt,
})

const store = createStore(
  reducers,
  applyMiddleware(...middleware),
  autoRehydrate(),
);
persistStore(store, {storage: AsyncStorage});

module.exports = store;

//
//
// Example state:
//
//
// const example = {
//   navigation: {
//     pendingRoute: 'MessagesScene',
//     pendingRoutePayload: {
//       id: '',
//       float_id: '',
//       etc: '',
//     }
//   },
//   user: {
//     loading: false,
//     error: null,
//     id: '',
//     access_token: '',
//     avatar_url: '',
//     name: '',
//     facebook_id: '',
//     facebook_access_token: '',
//   },
//   invitations: {
//     loading: false,
//     error: null,
//     all: [float, float],
//   },
//   convos: {
//     activeConvoId: '',
//     loading: false,
//     error: null,
//     all: [convo, convo, convo],
//   },
//   floats: {
//     loading: false,
//     error: null,
//     all: [float, float]
//   },
//   messages: {
//     oneConvoId: {
//       loading: false,
//       error: null,
//       all: [message, message, message],
//     },
//     anotherConvoId: {
//       loading: false,
//       error: null,
//       all: [],
//     }
//   }
// }

// const user = {
//   id: '',
//   name: '',
//   avatar_url: '',
// }
//
// const convo = {
//   id: 'abc123',
//   message: {
//     created_at: +new Date,
//     text: '',
//     user: user
//   },
//   unread: false,
// }
//
// const float = {
//   id: '',
//   title: '',
//   user: user,
//   created_at: +new Date,
// }
//
// const message = {
//   text: '',
//   created_at: +new Date,
//   type: '',
//   user: user,
// }
