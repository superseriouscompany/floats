'use strict';

import React, {Component} from 'react';
import BackgroundGeolocation from "react-native-background-geolocation";
import api from '../services/api'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Scratch extends Component {

  componentWillMount() {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    const baseUrl = __DEV__ ?
      'https://superserious.ngrok.io' :
      'https://floats.superserious.co/v1.1';

      // Now configure the plugin.
     BackgroundGeolocation.configure({
       // Geolocation Config
       desiredAccuracy: 1000,
       locationUpdateInterval: 15000,
       // Activity Recognition
       stopTimeout: 1,
       // Application config
       debug: false, // <-- enable for debug sounds & notifications
       stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
       startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
       // HTTP / SQLite config
       autoSync: false,         // <-- POST each location immediately to server
     }, function(state) {
       console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

       if (!state.enabled) {
         BackgroundGeolocation.start(function() {
           console.log("- Start success");
         });
       }
     });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    console.log('removing listeners');
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }
  onLocation(location) {
    api.pins.create({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    }).then(() => {
      console.warn('sent location');
    }).catch((err) => {
      console.error('error sending pin', err);
    })
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }

  render() { return (
    <View>
      <Text style={{padding: 100}}>Hey guys</Text>
    </View>
  )}
}
