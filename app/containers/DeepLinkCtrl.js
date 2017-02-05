'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinFloat} from '../actions/floats';
import {send} from '../actions/friendRequests';
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
      if( !bundle.error && !bundle.uri && !bundle.params ) { return; }
      if( !bundle.params || bundle.error ) { return console.warn(`Got unknown format for deep link ${JSON.stringify(bundle)}`) }

      switch(bundle.params['~feature']) {
        case 'friend-invitation':
          return this.addFriend(bundle.params.inviter_id);
        case 'float-invitation':
          this.addFriend(bundle.params.inviter_id);
          return this.joinFloat(bundle.params.float_id, bundle.params.float_token)
        default:
          console.warn(`Got unknown deep link ${JSON.stringify(bundle)}`)
      }
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleLink);
  }

  addFriend(id) {
    if( !id ) { return console.warn('No id set in addFriend'); }
    this.props.dispatch(send(id)).then(() => {
      alert('Sent friend request')
    }).catch((err) => {
      console.warn(err);
    })
  }

  joinFloat(id, token) {
    if( !id ) { return console.warn('No id set in joinFloat'); }
    if( !token ) { return console.warn('No token set in joinFloat'); }
    this.props.dispatch(joinFloat(id, token)).then(() => {
      this.props.dispatch({type: 'dirty'})

      this.props.dispatch({
        type: 'navigation:queue',
        route: 'FloatsScene',
      })
    })
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
