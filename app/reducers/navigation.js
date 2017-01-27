export default function navigation(state = {}, action) {
  switch(action.type) {
    case 'navigation:queue':
      return {
        ...state,
        pendingRoute: action.route,
        pendingRoutePayload: action.payload,
      }
    case 'navigation:success':
      return {
        ...state,
        pendingRoute: null,
        pendingRoutePayload: null,
      }
    default:
      return state;
  }
}
