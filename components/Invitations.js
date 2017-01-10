'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Plan from './Plan';
import Zapper from './Zapper';
import base from '../styles/base';
import moment from 'moment';
import {
  Image,
  View
} from 'react-native';

export default class Invitations extends Component {
  render() { return (
    <View style={{backgroundColor: base.colors.offwhite, borderBottomWidth: 1, borderBottomColor: base.colors.lightgrey}}>
      { !this.props.invitations || !this.props.invitations.length ?
        <View style={{alignItems: 'center', paddingTop: 9, paddingBottom: 10 }}>
          <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>no pending invitations</Text>
        </View>
      :
        <View style={[base.padFullHorizontal, base.padMainItem]}>
          {this.props.invitations.map((p, i) => (
            <View key={i} style={{flexDirection: 'row', paddingBottom: 18 }}>
              <Image source={{url: p.user.avatar_url}} style={base.photoCircle}/>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>{p.user.name} "{p.title}"</Text>
                <Text style={base.timestamp}>
                  {moment(p.created_at).fromNow()}
                </Text>
              </View>
              <Zapper active={!!p.attending}></Zapper>
            </View>
          ))}
        </View>
      }
    </View>
  )}
}
