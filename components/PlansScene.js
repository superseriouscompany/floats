'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Heading from './Heading';
import ReturnArrow from './ReturnArrow';
import YourPlan from './YourPlan';
import Invitations from './Invitations';
import TabBar from './TabBar';
import Text from './Text';
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
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
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      api.floats.mine(accessToken).then((floats) => {
        this.setState({loadedPlan: true, plan: floats[0]});
      }).catch((err) => {
        this.setState({loadedPlan: true, planError: err});
      })

      api.floats.invites(accessToken).then((floats) => {
        this.setState({loadedInvitations: true, invitations: floats});
      }).catch((err) => {
        this.setState({loadedInvitations: true, invitationsError: err});
      })
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
        <View style={[{alignItems: 'center', justifyContent: 'center'}, base.mainWindow]}>
          { !this.state.loadedPlan ?
            <View style={{height: 50}}>
              <ActivityIndicator
                style={[base.loadingTop, {transform: [{scale: 1.5}]}]}
                size="small"
                color='#E88868'
              />
            </View>
          : this.state.planError ?
            <Text style={{color: 'indianred'}}>{this.state.planError}</Text>
          : this.state.plan ?
            <YourPlan plan={this.state.plan}></YourPlan>
          :
            null
          }
        </View>
        <View style={base.mainWindow}>
          { !this.state.loadedInvitations ?
            <View style={{height: 50}}>
              <ActivityIndicator
                style={[base.loadingTop, {transform: [{scale: 1.5}]}]}
                size="small"
                color='#E88868'
              />
            </View>
          : this.state.invitationsError ?
            <Text style={{color: 'indianred'}}>{this.state.invitationsError}</Text>
          :
            <Invitations invitations={this.state.invitations}></Invitations>
          }
        </View>
      </ScrollView>
      <TabBar active="floats" navigator={this.props.navigator}/>
    </View>
  )}
}
