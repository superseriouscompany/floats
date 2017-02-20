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

const defaultValue = 25;

export default class RadiusSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {value: defaultValue}
  }

  render() { return (
    <View style={[styles.container, base.padFullHorizontal]}>
      <Slider
        minimumValue={1}
        value={defaultValue}
        maximumValue={50}
        step={1}
        minimumTrackTintColor="hotpink"
        maximumTrackTintColor="cornflowerblue"
        onValueChange={(value) => this.setState({value: value})}
        onSlidingComplete={this.props.changeRadius}
        style={styles.slider}
        />
      <Text style={styles.value}>{this.state.value}</Text>
    </View>
  )}
}

RadiusSlider.propTypes = {
  changeRadius: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  value: {
    width: 30,
    textAlign: 'right',
    color: 'slateblue',
  }
})
