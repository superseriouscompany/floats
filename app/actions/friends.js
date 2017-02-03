import api from '../services/api';

export function fetch(cacheTime) {
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
