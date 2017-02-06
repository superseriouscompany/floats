export default function friends(state = {}, action) {
  switch(action.type) {
    case 'friends:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'friends:load:yes':
      return {
        ...state,
        items: action.friends,
        enemies: action.enemies,
        loading: false,
        cacheTime: +new Date,
      }
    case 'friends:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'friends:block:load':
      return {
        ...state,
        items: state.items.map((f) => {
          if( f.friend_id == action.id ) {
            f.loading = true;
          }
          return f;
        })
      }
    case 'friends:block:no':
      return {
        ...state,
        items: state.items.map((f) => {
          if( f.friend_id == action.id ) {
            f.loading = false;
            f.error    = action.error;
          }
          return f;
        })
      }
    case 'friends:unblock:load':
      return {
        ...state,
        enemies: state.enemies.map((f) => {
          if( f.friend_id == action.id ) {
            f.loading = true;
          }
          return f;
        })
      }
    case 'friends:unblock:no':
      return {
        ...state,
        enemies: state.enemies.map((f) => {
          if( f.friend_id == action.id ) {
            f.loading = false;
            f.error    = action.error;
          }
          return f;
        })
      }
    default:
      return state;
  }
}
