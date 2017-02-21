'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Slider,
  StyleSheet,
  View,
} from 'react-native';

export default class RadiusSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {value: props.radius}
  }

  render() { return (
    <View style={[styles.container, base.padFullHorizontal]}>
      <Slider
        minimumValue={1}
        value={this.state.value}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={base.colors.color1}
        maximumTrackTintColor={base.colors.lightgrey}
        onValueChange={(value) => this.setState({value: value})}
        onSlidingComplete={this.props.changeRadius}
        style={styles.slider}
        />
      <Text style={styles.value}>{this.state.value == 100 ? '100+' : this.state.value + ' km'}</Text>
    </View>
  )}
}

RadiusSlider.propTypes = {
  changeRadius: React.PropTypes.func.isRequired,
  radius:       React.PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 3,
  },
  value: {
    fontSize: base.fontSizes.small,
    width: 60,
    textAlign: 'right',
    color: base.colors.mediumgrey,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginRight: 1,
  }
})
