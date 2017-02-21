'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import Text from './Text';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class NearbyFriend extends Component {
  constructor(props) {
    super(props);
  }

  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} activeOpacity={1} onPress={this.props.toggle} accessible={true} accessibilityLabel={`Select ${this.props.friend.name}`}>
        <Image style={[base.photoCircle]} source={{uri: this.props.friend.avatar_url}}/>
        <Text style={[styles.main, {marginRight: 10}]}>
          {this.props.friend.name}
          { this.props.friend.distance > 100 ?
            <Text style={styles.distance}>
              {"\n"}{this.roundedDistance(this.props.friend.distance)}
            </Text>
          : null }
        </Text>
        { this.props.friend.selected ?
          <Image source={require('../images/Checked.png')} />
        :
          <Image source={require('../images/EmptyCircle.png')} />
        }
      </TouchableOpacity>
    </View>
  )}

  roundedDistance(distance) {
    return distance < 500 ? '<500km'
      : distance < 1000 ? '<1000km'
      : distance < 5000 ? '<5000km'
      : distance < 'far, far away'
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
  distance: {
    color: base.colors.mediumlightgrey,
    fontSize: base.fontSizes.small,
  },
});
