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
    this.state = { selected: true }
  }

  render() { return (
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={{uri: this.props.friend.avatar_url}}/>
      <Text style={[styles.main, {marginRight: 10}]}>{this.props.friend.name}</Text>
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
    const selected = !this.state.selected;
    this.context.store.dispatch({type: 'toggleFriend', on: selected, id: this.props.friend.id});
    this.setState({selected: selected});
  }
}
NearbyFriend.contextTypes = {
  store: React.PropTypes.object
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
});
