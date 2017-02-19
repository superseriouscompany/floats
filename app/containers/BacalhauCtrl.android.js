'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';

class BacalhauCtrl extends Component {
  render() { return this.props.children }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(BacalhauCtrl);
