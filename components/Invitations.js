'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Plan from './Plan';
import Zapper from './Zapper';
import base from '../styles/base';
import moment from 'moment';
import {
  ActionSheetIOS,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Invitations extends Component {
  render() { return (
    <View>
      { !this.props.invitations || !this.props.invitations.length ?
        <View style={{alignItems: 'center', paddingTop: 9, paddingBottom: 10 }}>
          <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>no pending invitations</Text>
        </View>
      :
        <View>
          {this.props.invitations.map((p, i) => (
            <View key={i} style={[base.padFullHorizontal, {flexDirection: 'row', paddingTop: 19, paddingBottom: 16, borderBottomWidth: 0.5, borderBottomColor: base.colors.lightgrey}]}>
              <TouchableOpacity onPress={() => this.reportDialog(p)}>
                <Image source={{url: p.user.avatar_url}} style={base.photoCircle}/>
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16}}>{p.user.name} "{p.title}"</Text>
                <Text style={base.timestamp}>
                  {moment(p.created_at).fromNow()}
                </Text>
                { !!p.attending ?
                  <View>
                    <Text style={[base.timestamp, {color: base.colors.mediumgrey, paddingTop: 5}]}>{p.user.name}&#39;s been notified</Text>
                    <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>text to coordinate</Text>
                  </View>
                : null
                }
              </View>
              <Zapper floatId={p.id} active={!!p.attending}></Zapper>
            </View>
          ))}
        </View>
      }
    </View>
  )}

  reportDialog(p) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [`Report ${p.user.name}`, 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index == 0 ) {
        alert(`You have reported ${p.user.name} for floating ${p.title}`);
      }
    })
  }
}
