'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinFloat} from '../actions/floats';
import branch from 'react-native-branch';
import {
  Linking
} from 'react-native'

const qs  = require('querystring');
const URL = require('url');

class DeepLinkCtrl extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this)
  }

  componentWillMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleLink({url: url});
      }
    }).catch(err => console.error('An error occurred', err));

    Linking.addEventListener('url', this.handleLink);

    branch.subscribe((bundle) => {
      console.warn(`Got deep link ${JSON.stringify(bundle)}`);
      if (bundle && bundle.params && !bundle.error) {}
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleLink)
  }

  handleLink(event) {
    const url    = URL.parse(event.url);
    const query  = qs.parse(url.query);

    const noun = url.host;
    const verb = url.pathname.substring(1);
    if( noun == 'floats' && verb == 'join' ) {
      const token = query.token;
      if( !token ) { return console.warn('No token in', event.url); }
      this.props.dispatch(joinFloat(token))
    }
  }

  render() { return this.props.children }
}

export default connect()(DeepLinkCtrl);
