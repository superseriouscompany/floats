'use strict';

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://giggles.superserious.co';

const deviceId = require('react-native-device-info').getUniqueID();

module.exports = {
  friends: {
    nearby: function(accessToken) {
      return fetch(`${baseUrl}/friends/nearby`, {
        method: 'POST',
        headers: headers(accessToken),
      }).then(function(response) {
        return response.friends;
      })
    },
  }
}

function headers(accessToken) {
  return {
    'Content-Type': 'application/json',
    'X-Device-Id': deviceId,
    'X-Access-Token': accessToken
  }
}
