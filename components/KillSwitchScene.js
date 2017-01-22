'use strict';

import React from 'react';
import Component from './Component';
import Heading from './Heading';
import Text from './Text';
import base from '../styles/base';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class KillSwitchScene extends Component {
  constructor(props) {
    super(props);
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>new floats</Heading>
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={[base.bgBreakingSection, {alignSelf: 'stretch', alignItems: 'center', paddingTop: 6, paddingBottom: 7, borderBottomWidth: 0.5, borderColor: base.colors.mediumgrey}]}>
          <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
            update required
          </Text>
        </View>
        <View style={{alignItems: 'center', paddingTop: 13, paddingBottom: 15, }}>
          <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center'}]}>
            hello! we’ve made some big changes{"\n"}and ask that you update floats:
          </Text>
        </View>
        <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('RandosScene')}>
          <Text style={styles.emptyButtonText}>
            update app
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  emptyButtons: {
    width: 200,
    height: 50,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButtonText: {
    color: 'white',
    textAlign: 'center'
  },
});
