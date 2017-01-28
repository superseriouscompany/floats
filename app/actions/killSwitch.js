'use strict';

import {appVersion} from 'react-native-version-number';
import {Platform} from 'react-native';
import api from '../services/api';

export function checkStatus(dispatch) {
  api.killSwitch(Platform.OS, appVersion).catch(function(err) {
    if( err.name === 'Killed' ) { return dispatch({type: 'killed'}) }
    console.error(err);
  });
}
