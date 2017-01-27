export default function dirty(state = false, action) {
  switch(action.type) {
    case 'clean':
      return false;
    case 'dirty':
      return true;
    default:
      return state;
  }
}
