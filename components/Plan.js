'use strict';

import React, {Component} from 'react';

import {
  Image,
  View
} from 'react-native';

import AppText from './AppText';
import Attendee from './Attendee';

const base   = require('../styles/base');
const moment = require('moment');

export default class Plan extends Component {
  render() { return (
    <View style={{flex: 1}}>
      <AppText>{this.props.plan.user.name || 'You'} "{this.props.plan.title}"</AppText>
      <AppText style={base.timestamp}>
        {moment(this.props.plan.created_at).fromNow()}
        { this.props.attendees ?
          <AppText> | {this.props.attendees.length} interested</AppText>
        :
          null
        }
      </AppText>

      { this.props.attendees ?
        <View>
          {this.props.attendees.map((u, i) => (
            <Attendee key={i} user={u} />
          ))}
        </View>
      :
        null
      }
    </View>
  )}
}
