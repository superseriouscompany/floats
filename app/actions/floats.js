import api from '../services/api';

export function joinFloat(id, token) {

  return function(dispatch) {
    dispatch({type: 'floats:join:load'});

    return api.floats.join(id,token).then(function(float) {
      dispatch({
        type: 'floats:join:load:yes',
        float: float,
      })
    }).catch(function(err) {
      dispatch({
        type: 'floats:join:load:no',
        error: err.message,
      })
    })
  }
}
