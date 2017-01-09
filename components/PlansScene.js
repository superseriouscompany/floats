'use strict';

import React, {Component} from 'react';

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

const base = require('../styles/base');
const api  = require('../services/api');

import Heading from './Heading';
import ReturnArrow from './ReturnArrow';
import YourPlan from './YourPlan';
import Invitations from './Invitations';
import AppText from './AppText';

export default class PlansScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loadedPlan: false, loadedInvitations: false, }
  }

  componentDidMount() {
    api.bubbles.mine().then((plan) => {
      this.setState({loadedPlan: true, plan: plan});
    }).catch((err) => {
      this.setState({loadedPlan: true, planError: err});
    })

    api.bubbles.invites().then((invitations) => {
      this.setState({loadedInvitations: true, invitations: invitations});
    }).catch((err) => {
      this.setState({loadedInvitations: true, invitationsError: err});
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>happenings</Heading>
        <View style={base.rightNav}>
          <ReturnArrow navigator={this.props.navigator}/>
        </View>
      </View>

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          { !this.state.loadedPlan ?
            <ActivityIndicator size="small" color="hotpink" />
          : this.state.planError ?
            <AppText style={{color: 'indianred'}}>{this.state.planError}</AppText>
          : this.state.plan ?
            <YourPlan plan={this.state.plan}></YourPlan>
          :
            null
          }
        </View>
        <View>
          <Invitations invitations={this.state.invitations}></Invitations>
        </View>
      </ScrollView>
    </View>
  )}
}
