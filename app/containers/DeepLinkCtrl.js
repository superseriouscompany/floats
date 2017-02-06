'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {processDeeplink} from '../actions/deeplinks';
import branch from 'react-native-branch';

const qs  = require('querystring');
const URL = require('url');

class DeepLinkCtrl extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.branchUnsubscribe = branch.subscribe((bundle) => {
      if( !bundle ) { return console.warn(`Got empty deep link`); }
      if( !bundle.error && !bundle.uri && !bundle.params ) { return; }
      if( bundle.uri && bundle.uri.match(/^fb/) ) { return; }
      if( bundle.error ) {
        return console.warn(`Got error for deep link ${JSON.stringify(bundle)}`)
      }
      if( !bundle.params ) {
        return console.warn(`Got empty params in bundle ${JSON.stringify(bundle)}`)
      }

      console.warn('Got a deeplink bundle', JSON.stringify(bundle));
      if( !this.props.user.id ) {
        return this.props.dispatch({type: 'deeplinks:queue', payload: bundle});
      } else {
        processDeeplink(bundle, this.props.user);
      }
    })
  }

  componentWillUnmount() {
    this.branchUnsubscribe();
  }

  render() { return this.props.children }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(DeepLinkCtrl);
