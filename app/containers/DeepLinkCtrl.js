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
    this.addFriend  = this.addFriend.bind(this)
  }

  componentWillMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleLink({url: url});
      }
    }).catch(err => console.error('An error occurred', err));

    Linking.addEventListener('url', this.handleLink);

    branch.subscribe((bundle) => {
      if( !bundle ) { return console.warn(`Got empty deep link`); }
      console.warn(`Got deep link ${JSON.stringify(bundle)}`);
      if( bundle.params && !bundle.error ) {
        if( bundle.params['~feature'] == 'friend-invitation' ) {
          return this.addFriend(bundle.params.inviter_id);
        }
      }
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleLink);
  }

  addFriend(id) {
    if( !id ) { return console.warn('No id set in addFriend'); }
    alert('Adding ' + id);
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
