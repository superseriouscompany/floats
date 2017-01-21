'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io/v1' :
  'https://floats.superserious.co/v1';

import {
  AsyncStorage
} from 'react-native'

import store from './store';

const api = {
  sessions: {
    create: function(facebookAccessToken) {
      return fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify({facebook_access_token: facebookAccessToken}),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      })
    },

    updateFirebaseToken: function(accessToken, firebaseToken) {
      return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          firebase_token: firebaseToken,
        }),
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return true;
      })
    },
  },

  users: {
    deleteAccount: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/users/me`, {
          method: 'DELETE',
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return true;
      })
    }
  },

  pins: {
    create: function(accessToken, location) {
      return fetch(`${baseUrl}/pins`, {
        method: 'POST',
        body: JSON.stringify(location),
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return true;
      })
    },
  },

  friends: {
    nearby: function(accessToken) {
      return fetch(`${baseUrl}/friends/nearby`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.friends;
      })
    },

    all: function(accessToken) {
      return fetch(`${baseUrl}/friends`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.friends;
      })
    }
  },

  randos: {
    all: function(accessToken) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/randos`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.randos;
      })
    }
  },

  friendRequests: {
    all: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests`, {
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error(response.status); }
          return response.json();
        }).then(function(json) {
          return json.friend_requests;
        })
      })
    },

    accept: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests/${id}`, {
          method: 'PUT',
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error(response.status); }
          return true;
        })
      })
    },

    send: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests`, {
          method: 'POST',
          body: JSON.stringify({ user_id: id }),
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error(response.status); }
          return true;
        })
      })
    },

    destroy: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({ user_id: id }),
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error(response.status); }
          return true;
        })
      })
    }
  },

  floats: {
    create: function(accessToken, userIds, title) {
      return fetch(`${baseUrl}/floats`, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          invitees: userIds
        }),
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return true;
      })
    },

    mine: function(accessToken) {
      return fetch(`${baseUrl}/floats/mine`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.floats;
      })
    },

    invites: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.floats;
      }).catch(function(err) {
        console.error(err);
        store.dispatch({
          type: 'load:invitations:failure',
          error: err.message,
        })
        throw err;
      })
    },

    join: function(accessToken, floatId, silent) {
      return fetch(`${baseUrl}/floats/${floatId}/join`, {
        method: 'POST',
        headers: headers(accessToken),
        body: JSON.stringify({silent: !!silent}),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }

        return true;
      })
    },

    destroy: function(accessToken, floatId) {
      return fetch(`${baseUrl}/floats/${floatId}`, {
        method: 'DELETE',
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }

        return true;
      })
    },
  },

  messages: {
    create: function(text) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/nope/convos/nope/messages`, {
          method: 'POST',
          headers: headers(accessToken),
          body: JSON.stringify({text: text})
        })
      })
    },
  }
}
module.exports = api;

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    'X-Access-Token': accessToken,
  }
}
