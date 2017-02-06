import api from '../services/api';

import { fetchFriends } from './friends'

export function send(userId) {
  return function(dispatch) {
    dispatch({type: 'friendRequests:load', id: userId});

    return api.friendRequests.create(userId).then(() => {
      dispatch({type: 'friendRequests:load:yes', id: userId});
    }).catch((err) => {
      dispatch({type: 'friendRequests:load:no', error: err.message});
    });
  }
}

export function fetchFriendRequests(cacheTime) {
  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'friendRequests:load'});

    api.friendRequests.all().then(function(friendRequests) {
      dispatch({
        type: 'friendRequests:load:yes',
        friendRequests: friendRequests,
      })
    }).catch(function(err) {
      dispatch({
        type: 'friendRequests:load:no',
        error: err.message,
      })
    })
  }
}

export function accept(userId) {
  return function(dispatch) {
    dispatch({type: 'friendRequests:accept:load', id: userId})
    api.friendRequests.accept(userId).then(() => {
      dispatch({type: 'friendRequests:accept:yes', id: userId})
      dispatch(fetchFriends())
      dispatch(fetchFriendRequests());
    }).catch((err) => {
      dispatch({type: 'friendRequests:accept:no', id: userId, error: err})
    })
  }
}

export function deny(userId) {
  return function(dispatch) {
    dispatch({type: 'friendRequests:deny:load', id: userId})

    api.friendRequests.deny(userId).then(() => {
      dispatch({type: 'friendRequests:deny:yes', id: userId})
      dispatch(fetchFriends())
      dispatch(fetchFriendRequests());
    }).catch((err) => {
      dispatch({type: 'friendRequests:deny:no', id: userId, error: err})
    })
  }
}
