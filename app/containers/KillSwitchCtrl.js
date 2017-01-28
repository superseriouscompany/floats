'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import KillSwitchScene from '../components/KillSwitchScene'
import { checkStatus } from '../actions/killSwitch'
import { Linking } from 'react-native'

class KillSwitchCtrl extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'killed'});
    // this.props.dispatch(checkStatus);
  }

  render() {
    if( this.props.killed ) {
      return <KillSwitchScene downloadUpdate={this.downloadUpdate.bind(this)}/>
    } else {
      return this.props.children;
    }
  }

  downloadUpdate() {
    Linking.openURL('itms://itunes.apple.com/us/app/floats-find-close-friends/id1195463981?mt=8').catch(err => console.error('An error occurred', err));
  }
}

function mapStateToProps(state) {
  return {
    killed: state.killed,
  };
}

export default connect(mapStateToProps)(KillSwitchCtrl);
