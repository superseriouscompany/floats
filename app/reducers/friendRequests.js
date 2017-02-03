export default function friendRequests(state = {}, action) {
  switch(action.type) {
    case 'friendRequests:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'friendRequests:load:yes':
      return {
        ...state,
        items: action.friendRequests,
        loading: false,
        cacheTime: +new Date,
      }
    case 'friendRequests:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
