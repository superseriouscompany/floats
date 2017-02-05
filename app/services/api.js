'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://floats.superserious.co/v1.1';

import {
  AsyncStorage
} from 'react-native'

import store from './store';

const api = {
  sessions: {
    create: function(facebookAccessToken) {
      let isExisting;
      return fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify({facebook_access_token: facebookAccessToken}),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        isExisting = response.status == 200;
        return response.json();
      }).then(function(json) {
        json.isExisting = isExisting;
        return json;
      })
    },

    updateFirebaseToken: function(firebaseToken) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/users/me`, {
          method: 'PATCH',
          body: JSON.stringify({
            firebase_token: firebaseToken,
          }),
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
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
        if( !response.ok ) { throw new Error('' + response.status); }
        return true;
      })
    }
  },

  pins: {
    create: function(location) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/pins`, {
          method: 'POST',
          body: JSON.stringify(location),
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return true;
      })
    },
  },

  friends: {
    nearby: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friends/nearby`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return response.json();
      }).then(function(json) {
        return json.friends;
      })
    },

    all: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friends`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return response.json();
      }).then(function(json) {
        return json.friends;
      })
    },

    block: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friends/${id}`, {
          method: 'DELETE',
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return true;
      })
    },

    unblock: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friends/${id}`, {
          method: 'PUT',
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return true;
      })
    }
  },

  randos: {
    all: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/randos`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
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
          if( !response.ok ) { throw new Error('' + response.status); }
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
          if( !response.ok ) { throw new Error('' + response.status); }
          return true;
        })
      })
    },

    create: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests/${id}`, {
          method: 'POST',
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error('' + response.status); }
          return true;
        })
      })
    },

    deny: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests/${id}`, {
          method: 'DELETE',
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error('' + response.status); }
          return true;
        })
      })
    },

    undo: function(id) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/friend_requests/mine/${id}`, {
          method: 'DELETE',
          headers: headers(accessToken),
        }).then(function(response) {
          if( !response.ok ) { throw new Error('' + response.status); }
          return true;
        })
      })
    }
  },

  floats: {
    create: function(userIds, title) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats`, {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            invitees: userIds
          }),
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) {
          return response.json().then(function(json) {
            if( json.message ) {
              throw new Error(json.message)
            } else {
              throw new Error('Sorry, something went wrong.');
            }
          })
        }
        return true;
      })
    },

    mine: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/mine`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
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
        if( !response.ok ) { throw new Error('' + response.status); }
        return response.json();
      }).then(function(json) {
        return json.floats;
      })
    },

    join: function(id,token) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/${id}/join/${token}`, {
          method: 'POST',
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }

        return response.json();
      });
    },

    leave: function(floatId) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/${floatId}/leave`, {
          method: 'DELETE',
          headers: headers(accessToken)
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }

        return true;
      })
    },

    destroy: function(floatId) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/${floatId}`, {
          method: 'DELETE',
          headers: headers(accessToken),
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }

        return true;
      })
    },
  },

  convos: {
    all: function() {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/convos`, {
          headers: headers(accessToken)
        }).then(function(response) {
          return response.json()
        }).then(function(json) {
          return json.convos;
        })
      })
    },
  },

  messages: {
    all: function(floatId, convoId) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/${floatId}/convos/${convoId}/messages`, {
          headers: headers(accessToken),
        })
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        return json.messages;
      })
    },
    create: function(floatId, convoId, text) {
      return AsyncStorage.getItem('@floats:accessToken').then(function(accessToken) {
        return fetch(`${baseUrl}/floats/${floatId}/convos/${convoId}/messages`, {
          method: 'POST',
          headers: headers(accessToken),
          body: JSON.stringify({text: text})
        })
      })
    },
  },

  killSwitch: function(platform, version) {
    return fetch(`${baseUrl}/kill/${platform}/${version}`).then(function(response) {
      if( response.status === 404 ) {
        return false;
      } else if( response.status === 410 ) {
        const err = new Error('killed');
        err.name = 'Killed';
        throw err;
      }

      throw response.status;
    })
  },
}
module.exports = api;

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    'X-Access-Token': accessToken,
  }
}
