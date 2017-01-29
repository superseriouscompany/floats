import FCM from 'react-native-fcm';
import api from '../services/api';

export function fetchNearbyFriends(cacheTime) {

  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'nearbyFriends:load'});
    FCM.requestPermissions();
    // FIXME: retry as long as it's not set
    FCM.getFCMToken().then( (token) => {
      if( !token ) { return console.warn("No firebase token available."); }
      api.sessions.updateFirebaseToken(token);
    });
    FCM.on('refreshToken', (token) => {
      if( !token ) { return console.warn("No firebase token on refresh."); }
      api.sessions.updateFirebaseToken(token);
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        api.pins.create({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }).then(function() {
          return api.friends.nearby();
        }).then((friends) => {
          friends = friends.map(function(f) {
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
