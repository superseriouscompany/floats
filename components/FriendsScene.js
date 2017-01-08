'use strict';

import React, {Component} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import UnreadHeart from './UnreadHeart';
import Logo from './Logo';
import FriendsCount from './FriendsCount';
import Friend from './Friend';
import BroadcastBox from './BroadcastBox';

const base = require('../styles/base');

let friends = [
  { name: 'Neil Sarkar' },
  { name: 'Andrew Sauer' },
  { name: 'John Malqvist' },
  { name: 'Annie Graham' },
]

export default class FriendsScene extends Component {
  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <View style={base.leftNav}>
          <UnreadHeart navigator={this.props.navigator}/>
        </View>
        <Logo />
      </View>

      <View style={base.mainWindow}>
        <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection]}>
          <FriendsCount />
        </View>
        <ScrollView>
          {friends.map((f, i) => (
            <Friend key={i} friend={f} />
          ))}
        </ScrollView>
      </View>

      <View style={base.bottomBar}>
        <BroadcastBox />
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
});
