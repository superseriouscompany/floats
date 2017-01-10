'use strict';

import React from 'react';
import AppText  from './AppText';
import Plan     from './Plan';
import Attendee from './Attendee';
import Component from './Component';
import base from '../styles/base';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

export default class YourPlan extends Component {
  constructor(props) {
    super(props);
    console.log(this.cool);
  }

  render() {
    const plan = this.props.plan;
    if( !plan ) { return null; }
    return (
    <View style={[{flexDirection: 'row', paddingBottom: 18, backgroundColor: base.colors.offwhite, borderBottomWidth: 1, borderBottomColor: base.colors.lightgrey}, base.padFullHorizontal, base.padMainItem]}>
      <Image source={{url: this.props.plan.user.avatar_url}} style={base.photoCircle} />
      <View style={{flex: 1}}>
        <Plan plan={plan} attendees={plan.attendees}/>
        <AppText style={[base.timestamp, {color: base.colors.mediumgrey}]}>text them to coordinate</AppText>
        <View style={{flexDirection: 'row'}}>
          <AppText style={[base.timestamp, {color: base.colors.mediumgrey}]}>
            no longer feeling it? &nbsp;
          </AppText>
          <TouchableOpacity onPress={() => alert('Nope.')}>
            <AppText style={[base.timestamp, {textDecorationLine: 'underline', color: base.colors.mediumgrey}]}>delete your post</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
}
