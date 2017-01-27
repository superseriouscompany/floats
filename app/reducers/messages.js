'use strict';

export default function messages(state = {}, action) {
  switch(action.type) {
    case 'load:messages':
      let ret0 = {...state};
      ret0[action.convoId] = ret0[action.convoId] || {};
      ret0[action.convoId].loading = true;
      return ret0;
    case 'load:messages:success':
      let ret1 = {...state};
      ret1[action.convoId].all = action.messages;
      return ret1;
    default:
      return state;
  }
}
