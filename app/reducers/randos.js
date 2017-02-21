export default function randos(state = {}, action) {
  switch(action.type) {
    case 'randos:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'randos:load:yes':
      return {
        ...state,
        loading: false,
        items: action.randos.slice(0,100),
        cacheTime: +new Date,
      }
    case 'randos:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
