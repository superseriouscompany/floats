'use strict';

import React, {Component} from 'react';
import {
  Linking
} from 'react-native'

export default class DeepLinkCtrl extends Component {
  componentWillMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleLink({url: url});
      }
    }).catch(err => console.error('An error occurred', err));

    Linking.addEventListener('url', this.handleLink);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleLink)
  }

  handleLink(event) {
    console.warn('Got link', event.url);
  }

  render() { return this.props.children }
}
