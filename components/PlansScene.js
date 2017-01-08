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

const yourPlan = {
  title: "thinking of surfing supertubos at 10. it's 3-4 ft and offshore. who's downskis?",
  created_at: +new Date - 1000 * 60 * 60,
  // TODO: pull this from logged in user
  user: {
    avatar_url: 'https://placehold.it/80x80.png',
  },
  attendees: [
    {
      avatar_url: 'https://placehold.it/80x80.png',
      name: 'Andrew Sauer',
      joined_at: +new Date,
    },
    {
      avatar_url: 'https://placehold.it/80x80.png',
      name: 'Neil Sarkar',
      joined_at: +new Date,
    },
  ]
}

const invitations = [
  {
    title: 'Who here wants to play Catan after dinner?',
    created_at: +new Date - 1000 * 60 * 35,
    user: {
      name: 'John Malqvist',
      avatar_url: 'https://placehold.it/80x80.png',
    },
    attending: false,
  },
  {
    title: 'surf?',
    created_at: +new Date - 1000 * 60 * 120,
    user: {
      name: 'Annie Graham',
      avatar_url: 'https://placehold.it/80x80.png',
    },
    attending: true,
  },
]

export default class PlansScene extends Component {
  render() { return (
    <View>
      <View style={base.header}>
        <Heading>happenings</Heading>
        <View style={base.rightNav}>
          <ReturnArrow navigator={this.props.navigator}/>
        </View>
      </View>

      <ScrollView>
        <YourPlan plan={yourPlan}></YourPlan>
        <Invitations invitations={invitations}></Invitations>
      </ScrollView>
    </View>
  )}
}
