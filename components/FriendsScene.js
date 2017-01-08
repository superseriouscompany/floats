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
import AppText from './AppText';

const base = require('../styles/base');

let friends = [
  { name: 'Neil Sarkar', avatar_url:   'https://placehold.it/80x80.png'},
  { name: 'Andrew Sauer', avatar_url:  'https://placehold.it/80x80.png'},
  { name: 'John Malqvist', avatar_url: 'https://placehold.it/80x80.png'},
  { name: 'Annie Graham', avatar_url:  'https://placehold.it/80x80.png'},
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
        { !friends.length ?
          <View style={{alignItems: 'center'}}>
            <AppText style={[base.timestamp, {backgroundColor: base.colors.offwhite, paddingTop: 9, paddingBottom: 10, color: base.colors.mediumgrey}]}>
              nobody is nearby.
            </AppText>
          </View>
        :
          <View>
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection]}>
              <FriendsCount />
            </View>
            <ScrollView>
              {friends.map((f, i) => (
                <Friend key={i} friend={f} />
              ))}
            </ScrollView>
          </View>
        }
      </View>

      { !friends.length ?
        null
      :
        <View style={base.bottomBar}>
          <BroadcastBox active={!friends.length}/>
        </View>
      }
    </View>
  )}
}

const styles = StyleSheet.create({
});
