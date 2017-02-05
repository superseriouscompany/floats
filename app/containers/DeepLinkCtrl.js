'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {joinFloat} from '../actions/floats';
import {send} from '../actions/friendRequests';
import branch from 'react-native-branch';

const qs  = require('querystring');
const URL = require('url');

class DeepLinkCtrl extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this)
    this.addFriend  = this.addFriend.bind(this)
    this.processed  = [];
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
      if( !this.props.user ) {
        return console.warn('User is not logged in to process deep link');
      }
      if( bundle.params.inviter_id == this.props.user.id ) {
        return console.warn('Ignoring our own link');
      }

      console.warn('Got a bundle', JSON.stringify(bundle));
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
    this.branchUnsubscribe();
  }

  addFriend(id) {
    if( !id ) { return console.warn('No id set in addFriend'); }
    this.props.dispatch(send(id)).then(() => {
      console.warn('Sent friend request.');
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
    console.warn('handling link');
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

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(DeepLinkCtrl);
