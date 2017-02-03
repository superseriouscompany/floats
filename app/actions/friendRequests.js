import api from '../services/api';

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
