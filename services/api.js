'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io/v1' :
  'https://floats.superserious.co/v1';

module.exports = {
  sessions: {
    create: function(facebookAccessToken) {
      console.log("sending", facebookAccessToken);
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
  },

  floats: {
    create: function(accessToken, text, excludeIds) {
      return fetch(`${baseUrl}/floats`, {
        method: 'POST',
        body: JSON.stringify({
          text: text,
          exclude_ids: excludeIds
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

    invites: function(accessToken) {
      return fetch(`${baseUrl}/floats`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.floats;
      })
    },
  }
}

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    'X-Access-Token': accessToken,
  }
}
