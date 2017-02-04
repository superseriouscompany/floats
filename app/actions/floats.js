import api from '../services/api';

export function joinFloat(token) {

  return function(dispatch) {
    dispatch({type: 'floats:join:load'});

    return api.floats.join(token).then(function(float) {
      dispatch({
        type: 'floats:join:load:yes',
        float: float,
      })
      dispatch({
        type: 'navigation:queue',
        route: 'FloatsScene'
      })
    }).catch(function(err) {
      dispatch({
        type: 'floats:join:load:no',
        error: err.message,
      })
    })
  }
}
