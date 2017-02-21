import api from '../services/api';

export function fetchNearbyFriends(cacheTime) {

  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'nearbyFriends:load'});

    navigator.geolocation.getCurrentPosition(
      (position) => {
        api.pins.create({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }).then(function() {
          return api.friends.nearby();
        }).then((friends) => {
          friends = friends.filter((f) => {
            return !f.blocked
          }).map((f) => {
            f.selected = true;
            return f;
          })
          dispatch({type: 'nearbyFriends:load:yes', friends: friends});
        }).catch(function(err) {
          dispatch({type: 'nearbyFriends:load:no', error: err.message});
        })
      },
      (error) => {
        dispatch({type: 'nearbyFriends:load:no', error: error.message});
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  }
}

export function changeRadius(radius) {
  return function(dispatch) {
    dispatch({type: 'nearbyFriends:changeRadius', radius: radius})
  }
}
