import {joinFloat} from '../actions/floats';
import {send} from '../actions/friendRequests';

export function processDeeplink(bundle, user) {
  return function(dispatch) {
    if( !user ) { return console.warn('No user given to deeplink', user); }

    if( bundle.params.inviter_id == user.id ) {
      return console.warn('Ignoring our own link');
    }

    switch(bundle.params['~feature']) {
      case 'friend-invitation':
        return dispatch(send(bundle.params.inviter_id)).then(() => {
          console.warn('Sent friend request.');
        }).catch((err) => {
          console.warn(err);
        })
        return dispatch(send(bundle.params.inviter_id)).then(() => {
          console.warn('Sent friend request.');
        }).catch((err) => {
          console.warn(err);
        })
      case 'float-invitation':
        dispatch(send(bundle.params.inviter_id))
        return dispatch(joinFloat(bundle.params.float_id, bundle.params.float_token)).then(() => {
          dispatch({type: 'dirty'})

          dispatch({
            type: 'navigation:queue',
            route: 'FloatsScene',
          })
        })
      default:
        console.warn(`Got unknown deep link ${JSON.stringify(bundle)}`)
    }
  }
}
