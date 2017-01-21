'use strict';

import React from 'react';
import moment from 'moment';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class ConvoPreview extends Component {
  render() { const c = this.props.convo; return (
    <View style={styles.container}>
      <Image source={{url: c.message.user.avatar_url}} style={base.photoCircle}/>
      <View style={styles.message}>
        <Text style={styles.name}>
          { c.members.length == 2 ?
            c.message.user.name
          : c.members.length == 3 ?
            `${c.message.user.name.split(' ')[0]} and 1 other`
          : c.members.length > 3 ?
            `${c.message.user.name.split(' ')[0]} and ${c.members.length - 2} others`
          : null
          }
        </Text>
        <Text style={styles.text}>
          { c.message.text }
        </Text>
      </View>
      <Text>
        &gt;
      </Text>
      <Text style={[base.timestamp, styles.time]}>
        { moment(c.message.created_at).format('h:mma') }
      </Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  message: {
    flex: 1,
  },
  time: {
    color: 'lightgrey',
  }
})
