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
    <View style={{backgroundColor: base.colors.offwhite, borderBottomWidth: 1, borderBottomColor: base.colors.lightgrey}}>
      { !this.props.invitations || !this.props.invitations.length ?
        <View style={{alignItems: 'center', paddingTop: 9, paddingBottom: 10 }}>
          <AppText style={[base.timestamp, {color: base.colors.mediumgrey}]}>no pending invitations</AppText>
        </View>
      :
        <View style={[base.padFullHorizontal, base.padMainItem]}>
          {this.props.invitations.map((p, i) => (
            <View key={i} style={{flexDirection: 'row', paddingBottom: 18 }}>
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
