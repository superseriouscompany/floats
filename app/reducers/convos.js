export default function convos(state = {}, action) {
  switch(action.type) {
    case 'convos:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'convos:load:yes':
      return {
        ...state,
        all: action.convos,
        loading: false,
      }
    case 'convos:load:no':
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
    case 'convos:deactivate':
      return {
        ...state,
        activeConvoId: null,
      }
    case 'convos:changePreview':
      return {
        ...state,
        all: state.all.map(function(c) {
          if( c.id != action.convoId ) { return c; }
          c.message = action.message;
          return c;
        }),
      }
    default:
      return state;
  }
}
