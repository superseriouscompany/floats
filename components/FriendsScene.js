'use strict';

import React, {Component} from 'react';

import {
  ActivityIndicator,
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
const api  = require('../services/api');

export default class FriendsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      friends: []
    }
  }

  componentDidMount() {
    api.friends.nearby().then((friends) => {
      this.setState({friends: friends, loaded: true});
    }).catch((err) => {
      this.setState({error: err, loaded: true});
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <View style={base.leftNav}>
          <UnreadHeart navigator={this.props.navigator}/>
        </View>
        <Logo />
      </View>

      <View style={base.mainWindow}>
        { !this.state.loaded ?
          <ActivityIndicator
                      size="small"
                      color="hotpink"
                    />
        : this.state.error ?
          <AppText style={{color: 'indianred', textAlign: 'center'}}>{this.state.error}</AppText>
        : !this.state.friends.length ?
          <View style={{alignItems: 'center'}}>
            <AppText style={[base.timestamp, {backgroundColor: base.colors.offwhite, paddingTop: 9, paddingBottom: 10, color: base.colors.mediumgrey}]}>
              nobody is nearby.
            </AppText>
          </View>
        :
          <View>
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection]}>
              <FriendsCount count={this.state.friends.length} />
            </View>
            <ScrollView>
              {this.state.friends.map((f, i) => (
                <Friend key={i} friend={f} />
              ))}
            </ScrollView>
          </View>
        }
      </View>

      { this.state.loaded && !this.state.friends.length ?
        null
      :
        <View style={base.bottomBar}>
          <BroadcastBox friends={this.state.friends} active={!this.state.friends.length}/>
        </View>
      }
    </View>
  )}
}
