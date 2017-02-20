'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import ActivityPromptScene from '../components/ActivityPromptScene'

class ActivityPromptCtrl extends Component {
  constructor(props) {
    super(props)
    this.setActivity = this.setActivity.bind(this)
  }

  render() { return (
    <ActivityPromptScene {...this.props} setActivity={this.setActivity}/>
  )}

  setActivity(text) {
    this.props.dispatch({type: 'activityPrompt:set', text: text})
    this.props.navigator.navigate('CreateFloatScene')
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ActivityPromptCtrl);
