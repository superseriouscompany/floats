'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MessagesScene from '../components/MessagesScene'

class MessagesCtrl extends Component {
  render() { return (
    <MessagesScene {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MessagesCtrl);
