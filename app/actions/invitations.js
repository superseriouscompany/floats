import api from '../services/api';

export function fetchInvitations(cacheTime) {

  return function(dispatch) {
    if( cacheTime && +new Date - cacheTime < 1000 * 60 ) { console.log('Using cache'); return; }

    dispatch({type: 'invitations:load'});

    api.floats.invites().then(function(invitations) {
      dispatch({
        type: 'invitations:load:yes',
        invitations: invitations,
      })
    }).catch(function(err) {
      dispatch({
        type: 'invitations:load:no',
        error: err.message,
      })
    })
  }
}
