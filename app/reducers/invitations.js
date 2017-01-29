export default function invitations(state = {}, action) {
  switch(action.type) {
    case 'invitations:load':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'invitations:load:yes':
      return {
        ...state,
        all: action.invitations,
        loading: false,
        cacheTime: +new Date,
      }
    case 'invitations:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}
