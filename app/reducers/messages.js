'use strict';

export default function messages(state = {}, action) {
  let ret;
  switch(action.type) {
    case 'messages:append':
      ret = {...state};
      const messages = ret[action.convoId].all;
      ret[action.convoId].all = [action.message].concat(messages)
      return ret;
    case 'messages:send:no':
      return state;
    case 'load:messages':
      ret = {...state};
      ret[action.convoId] = ret[action.convoId] || {};
      ret[action.convoId].loading = true;
      return ret;
    case 'load:messages:success':
      ret = {...state};
      ret[action.convoId].all = action.messages;
      return ret;
    default:
      return state;
  }
}
