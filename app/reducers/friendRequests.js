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
    case 'friendRequests:accept:load':
    case 'friendRequests:deny:load':
      return {
        ...state,
        items: state.items.map((fr) => {
          if( fr.user.id == action.id ) {
            fr.loading = true;
          }
          return fr;
        })
      }
    case 'friendRequests:accept:no':
    case 'friendRequests:deny:no':
      return {
        ...state,
        items: state.items.map((fr) => {
          if( fr.user.id == action.id ) {
            fr.loading = true;
            fr.error = action.error.message
          }
          return fr;
        })
      }
    default:
      return state;
  }
}
