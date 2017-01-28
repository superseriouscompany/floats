'use strict';

export default function(state = false, action) {
  switch(action.type) {
    case 'killed':
      return true;
    default:
      return state;
  }
}
