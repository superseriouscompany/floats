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
import randos from './randos'

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
  randos,
})

const store = createStore(
  reducers,
  applyMiddleware(...middleware),
  autoRehydrate(),
);
persistStore(store, {storage: AsyncStorage});

module.exports = store;
