'use strict';

import React, {Component} from 'react';

import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText  from './AppText';
import Plan     from './Plan';
import Attendee from './Attendee';
const base = require('../styles/base');

export default class YourPlan extends Component {
  render() {
    const plan = this.props.plan;
    return (
    <View>
      <View style={[{flexDirection: 'row', alignItems: 'flex-start'}, base.padFullHorizontal, base.padMainItem]}>
        <Image source={{url: this.props.plan.user.avatar_url}} style={base.photoCircle} />
        <View>
          <Plan plan={plan} attendees={plan.attendees}/>
          <AppText style={[base.timestamp]}>text them to coordinate</AppText>
          <View style={{flexDirection: 'row'}}>
            <AppText style={base.timestamp}>
              no longer feeling it?
            </AppText>
            <TouchableOpacity onPress={() => alert('Nope.')}>
              <AppText style={[base.timestamp, {textDecorationLine: 'underline'}]}>delete your post</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )}
}
