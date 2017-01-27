'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class InviteButton extends Component {
  render() { return (
    <View style={{padding: 19, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.inviteButton}>
        <Text style={{fontSize: base.fontSizes.normal, color: 'white'}}>invite friends</Text>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  inviteButton: {
    backgroundColor: base.colors.color2,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingBottom: 1,
  }
})
