import api from '../services/api';

export function fetchRandos(cacheTime) {
  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'randos:load'});

    api.randos.all().then((randos) => {
      dispatch({type: 'randos:load:yes', randos: randos});
    }).catch(function(err) {
      dispatch({type: 'randos:load:no', error: err.message});
    })
  }
}
