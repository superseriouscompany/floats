'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io/v1' :
  'https://floats.superserious.co/v1';

module.exports = {
  sessions: {
    create: function(facebookAccessToken) {
      return fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify({facebook_access_token: facebookAccessToken})
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      })
    },

    updateFirebaseToken: function(accessToken, firebaseToken) {
      return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          firebase_token: firebaseToken
        })
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return true;
      })
    },
  },

  pins: {
    create: function(accessToken, lat, lng) {
      return fetch(`${baseUrl}/pins`, {
        method: 'POST',
        body: JSON.stringify({
          lat: lat,
          lng: lng,
        })
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
      })
    },

    invites: function(accessToken) {
      return fetch(`${baseUrl}/floats`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      }).then(function(json) {
        return json.bubbles;
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
