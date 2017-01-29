import api from '../services/api';

export function fetchMyFloats(cacheTime) {

  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'myFloats:load'});

    api.floats.mine().then(function(floats) {
      dispatch({
        type: 'myFloats:load:yes',
        floats: floats,
      })
    }).catch(function(err) {
      dispatch({
        type: 'myFloats:load:no',
        error: err.message,
      })
    })
  }
}
