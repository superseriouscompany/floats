'use strict';

import React, {Component} from 'react';

import {
  ScrollView,
  Text,
  View
} from 'react-native';

const base = require('../styles/base');

import Heading from './Heading';
import ReturnArrow from './ReturnArrow';
import YourPlan from './YourPlan';
import Invitations from './Invitations';
import OldPlans from './OldPlans';

export default class PlansScene extends Component {
  render() { return (
    <View>
      <View style={base.header}>
        <Heading>happenings</Heading>
        <View style={base.rightNav}>
          <ReturnArrow />
        </View>
      </View>

      <ScrollView>
        <YourPlan></YourPlan>
        <Invitations></Invitations>
        <OldPlans></OldPlans>
      </ScrollView>
    </View>
  )}
}
