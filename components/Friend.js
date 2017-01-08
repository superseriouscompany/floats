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
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={{uri: 'https://placehold.it/80x80.png'}}/>
      <AppText style={[styles.main]}>{this.props.friend.name}</AppText>
      <TouchableOpacity onPress={this.toggle.bind(this)} accessible={true} accessibilityLabel={`Select ${this.props.friend.name}`}>
        { this.state.selected ?
          <Image source={require('../images/Checked.png')} />
        :
          <Image source={require('../images/Unchecked.png')} />
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
