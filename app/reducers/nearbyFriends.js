export default function nearbyFriends(state = {}, action) {
  switch(action.type) {
    case 'nearbyFriends:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'nearbyFriends:load:yes':
      return {
        ...state,
        loading: false,
        items: action.friends,
        cacheTime: +new Date,
      }
    case 'nearbyFriends:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
