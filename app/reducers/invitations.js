export default function invitations(state = {}, action) {
  switch(action.type) {
    case 'load:invitations':
      return {
        ...state,
        loading: true,
      }
    case 'load:invitations:success':
      return {
        ...state,
        all: action.invitations,
        loading: false,
        cacheTime: +new Date,
      }
    case 'load:invitations:failure':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
