export default function deeplinks(state=[], action) {
  switch(action.type) {
    case 'deeplinks:queue':
      return state.concat(action.payload)
    case 'deeplinks:purge':
      return []
    default:
      return state;
  }
}
