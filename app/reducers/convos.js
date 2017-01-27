export default function convos(state = {}, action) {
  switch(action.type) {
    case 'load:convos':
      return {
        ...state,
        loading: true,
      }
    case 'load:convos:success':
      return {
        ...state,
        all: action.convos,
        loading: false,
      }
    case 'load:convos:failure':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'convos:activate':
      return {
        ...state,
        activeConvoId: action.id,
      }
    default:
      return state;
  }
}
