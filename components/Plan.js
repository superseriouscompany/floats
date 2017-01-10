'use strict';

import React from 'react';
import Component from './Component';
import AppText from './AppText';
import Attendee from './Attendee';
import base from '../styles/base';
import moment from 'moment';
import {
  Image,
  View
} from 'react-native';

export default class Plan extends Component {
  render() { return (
    <View style={{flex: 1}}>
      <AppText style={{fontSize: 12}}>{this.props.plan.user.name || 'You'} "{this.props.plan.title}"</AppText>
      <AppText style={base.timestamp}>
        {moment(this.props.plan.created_at).fromNow()}
        { this.props.attendees ?
          <AppText> | {this.props.attendees.length} interested</AppText>
        :
          null
        }
      </AppText>

      { this.props.attendees ?
        <View style={{paddingTop: 11, paddingBottom: 5}}>
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
