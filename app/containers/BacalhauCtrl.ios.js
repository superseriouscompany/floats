'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import BackgroundGeolocation from "react-native-background-geolocation";
import api from '../services/api';

class BacalhauCtrl extends Component {
  componentWillMount() {
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

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
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
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

  render() { return this.props.children }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(BacalhauCtrl);
