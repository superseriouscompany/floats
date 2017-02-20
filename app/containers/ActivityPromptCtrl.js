'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import ActivityPromptScene from '../components/ActivityPromptScene'

class ActivityPromptCtrl extends Component {
  render() { return (
    <ActivityPromptScene {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ActivityPromptCtrl);
