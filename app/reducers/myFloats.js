export default function myFloats(state = {}, action) {
  switch(action.type) {
    case 'myFloats:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'myFloats:load:yes':
      return {
        ...state,
        all: action.floats,
        loading: false,
        cacheTime: +new Date,
      }
    case 'myFloats:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
