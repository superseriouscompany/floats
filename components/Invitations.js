'use strict';

import React, {Component} from 'react';

import {
  Image,
  View
} from 'react-native';

import AppText from './AppText';
import Plan from './Plan';
import Zapper from './Zapper';

const base = require('../styles/base');

export default class Invitations extends Component {
  render() { return (
    <View>
      { !this.props.invitations || !this.props.invitations.length ?
        <AppText>no pending invitations</AppText>
      :
        <View style={[base.padFullHorizontal, base.padMainItem]}>
          {this.props.invitations.map((p, i) => (
            <View key={i} style={{flexDirection: 'row'}}>
              <Image source={{url: p.user.avatar_url}} style={base.photoCircle}/>
              <Plan plan={p}></Plan>
              <Zapper active={!!p.attending}></Zapper>
            </View>
          ))}
        </View>
      }
    </View>
  )}
}
