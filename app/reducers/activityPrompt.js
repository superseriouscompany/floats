export default function convos(state = {}, action) {
  switch(action.type) {
    case 'activityPrompt:set':
      return {
        ...state,
        text: action.text,
      }
    case 'activityPrompt:use':
      return {
        ...state,
        used: true,
      }
    default:
      return state;
  }
}
