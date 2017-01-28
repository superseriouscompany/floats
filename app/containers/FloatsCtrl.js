'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatsScene from '../components/FloatsScene';
// import { fetchFloats } from '../actions/floats';
// import { fetchConvos } from '../actions/convos';

class FloatsCtrl extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch(fetchFloats);
    // this.props.dispatch(fetchConvos);
  }

  render() { return (
    <FloatsScene {...this.props}/>
  )}
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(FloatsCtrl);
