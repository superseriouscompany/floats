export default function myFloats(state = {}, action) {
  switch(action.type) {
    case 'load:myFloats':
      return {
        ...state,
        loading: true,
      }
    case 'load:myFloats:success':
      return {
        ...state,
        all: action.floats,
        loading: false,
        cacheTime: +new Date,
      }
    case 'load:myFloats:failure':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
