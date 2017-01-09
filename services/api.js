'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://bubbles.superserious.co';

module.exports = {
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

  bubbles: {
    create: function(accessToken, text, excludeIds) {
      return fetch(`${baseUrl}/bubbles`, {
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
      return fetch(`${baseUrl}/bubbles/mine`, {
        headers: headers(accessToken),
      }).then(function(response) {
        if( !response.ok ) { throw new Error(response.status); }
        return response.json();
      })
    },

    invites: function(accessToken) {
      return fetch(`${baseUrl}/bubbles`, {
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
