export default function user(state = {}, action) {
  switch(action.type) {
    case 'login':
      return action.user;
    default:
      return state;
  }
}
