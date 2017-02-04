import api from '../services/api';

export function fetchFriends(cacheTime) {
  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'friends:load'});

    api.friends.all().then(function(allFriends) {
      const friends = allFriends.filter(function(f) { return !f.blocked });
      const enemies = allFriends.filter(function(f) { return !!f.blocked });

      dispatch({
        type: 'friends:load:yes',
        friends: friends,
        enemies: enemies,
      })
    }).catch(function(err) {
      dispatch({
        type: 'friends:load:no',
        error: err.message,
      })
    })
  }
}

export function block(id) {
  return function(dispatch) {
    dispatch({type: 'friends:block:load'});

    api.friends.block(id).then(function() {
      dispatch({
        type: 'friends:block:yes',
        id:   id,
      })
      dispatch(fetchFriends())
    }).catch(function(err) {
      dispatch({
        type:  'friends:block:no',
        id:    id,
        error: err.message,
      })
    })
  }
}

export function unblock(id) {
  return function(dispatch) {
    dispatch({type: 'friends:unblock:load'});

    api.friends.unblock(id).then(function() {
      dispatch({
        type: 'friends:unblock:yes',
        id:   id,
      })
      dispatch(fetchFriends())
    }).catch(function(err) {
      dispatch({
        type:  'friends:unblock:no',
        id:    id,
        error: err.message,
      })
    })
  }
}
