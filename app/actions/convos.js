import api from '../services/api';

export function fetchConvos(cacheTime) {

  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'convos:load'});

    api.convos.all().then(function(convos) {
      dispatch({
        type: 'convos:load:yes',
        convos: convos,
      })
    }).catch(function(err) {
      dispatch({
        type: 'convos:load:no',
        error: err.message,
      })
    })
  }
}
