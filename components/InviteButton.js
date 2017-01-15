'use strict';

import React from 'react';
import Component from './Component';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class InviteButton extends Component {
  render() { return (
    <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.inviteButton}>
        <Text style={{color: 'white'}}>invite others</Text>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  inviteButton: {
    backgroundColor: 'burntsienna',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }
})
