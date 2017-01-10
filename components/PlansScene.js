'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Heading from './Heading';
import ReturnArrow from './ReturnArrow';
import YourPlan from './YourPlan';
import Invitations from './Invitations';
import Text from './Text';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

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
            <Text style={{color: 'indianred'}}>{this.state.planError}</Text>
          : this.state.plan ?
            <YourPlan plan={this.state.plan}></YourPlan>
          :
            null
          }
        </View>
        <View>
          { !this.state.loadedInvitations ?
            <ActivityIndicator size="small" color="hotpink" />
          : this.state.invitationsError ?
            <Text style={{color: 'indianred'}}>{this.state.invitationsError}</Text>
          :
            <Invitations invitations={this.state.invitations}></Invitations>
          }
        </View>
      </ScrollView>
    </View>
  )}
}
