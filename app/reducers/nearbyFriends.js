export default function nearbyFriends(state = {radius: 25}, action) {
  switch(action.type) {
    case 'nearbyFriends:changeRadius':
      return {
        ...state,
        radius: action.radius,
      }
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
