'use strict';

import React, {Component} from 'react';

import {
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
      <View style={base.feedItem}>
        <Plan plan={plan} />
        <AppText style={base.timestamp}>{plan.created_at} | {plan.attendees.length} interested</AppText>
      </View>
      <View>
        {plan.attendees.map((u, i) => (
          <Attendee key={i} user={u} />
        ))}
      </View>
      <View>
        <AppText>text them to coordinate</AppText>
        <View style={{flexDirection: 'row'}}>
          <AppText>
            no longer feeling it?
          </AppText>
          <TouchableOpacity onPress={() => alert('Nope.')}>
            <AppText style={{textDecorationLine: 'underline'}}>delete your post</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
}
