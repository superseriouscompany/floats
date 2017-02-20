'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import BackgroundGeolocation from "react-native-background-geolocation";
import api from '../services/api';

const minutes     = 1000 * 60;
const interval    = 15 * minutes;
const radius      = 1000;

//
// In order to test on a simulator, set Location to Freeway Driveae
//
class BacalhauCtrl extends Component {
  componentWillMount() {
    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('error', this.onError);
    BackgroundGeolocation.on('providerchange', this.onProviderChange);

    //
    // If you change any of these settings, you need to uninstall and reinstall the app on the simulator.
    //
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: -1,                  // presumably kCLThreeKilometers, uses wifi signals and cell towers instead of satellites
      locationUpdateInterval: interval,     // maximum time to wait if no other services request location
      fastestLocationUpdateInterval: 1000,  // minimum time to wait if other services request location
      distanceFilter: radius,               // this determines how far the user must travel to trigger a location update
      disableElasticity: true,              // this prevents the parameter above from being multiplied if they are traveling in a car
      // Activity Recognition
      disableMotionActivityUpdates: true,   // this disables using the accelerometer, which gives better battery performance but requires a weird permission (Health Center)
      stopTimeout: 0,                       // ¯\_(ツ)_/¯
      // Application config
      maxRecordsToPersist: -1,              // this prevents us from saving locations to retry sending to server
      maxDaysToPersist: -1,                 // this prevents us from saving locations to retry sending to server
      debug: true,                          // debug mode -- sounds and notifications
      stopOnTerminate: false,               // continue tracking when user kills the app
      startOnBoot: true,                    // start tracking when device is powered-up.
      // HTTP / SQLite config
      autoSync: false,                      // don't use built in http client to post to server
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
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onLocation(location) {
    console.warn('Got location', JSON.stringify(location));
    api.pins.create({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    }).then(() => {
      console.log('sent location', JSON.stringify(location));
    }).catch((err) => {
      console.error('error sending pin', err);
    })
  }

  onProviderChange(provider) {
    console.warn('Provider changed', JSON.stringify(provider))
  }

  onError(err) {
    console.error(err);
  }

  render() { return this.props.children }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(BacalhauCtrl);
