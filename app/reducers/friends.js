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
    default:
      return state;
  }
}
