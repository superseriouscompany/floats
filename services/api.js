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
  }
}

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    'X-Access-Token': accessToken,
  }
}
