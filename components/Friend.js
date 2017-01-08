'use strict';

import React, {Component} from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const base = require('../styles/base');
import AppText from './AppText';

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: true }
  }

  render() { return (
    <View style={[styles.box, base.padded]}>
      <Image style={{width: 40, height: 40}} source={{uri: 'https://placehold.it/80x80.png'}}/>
      <AppText style={[base.padded, styles.main]}>{this.props.friend.name}</AppText>
      <TouchableOpacity onPress={this.toggle.bind(this)} accessible={true} accessibilityLabel={`Select ${this.props.friend.name}`}>
        { this.state.selected ?
          <AppText>Yep</AppText>
        :
          <AppText>Nope</AppText>
        }
      </TouchableOpacity>
    </View>
  )}

  toggle() {
    this.setState({selected: !this.state.selected})
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: base.colors.foo,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});
