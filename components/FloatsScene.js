'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Heading from './Heading';
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

export default class FloatsScene extends Component {
  constructor(props) {
    super(props);

    this.state = { loadedPlan: false, invitations: {loading: true}, }
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      const state = this.context.store.getState();
      this.setState({
        invitations: state.invitations
      });
    })

    this.context.store.dispatch({
      type: 'load:invitations',
    })
    api.floats.invites().then((floats) => {
      this.context.store.dispatch({
        type: 'load:invitations:success',
        invitations: floats,
      })
    }).catch(function(err) {
      console.error(err);
      this.context.store.dispatch({
        type: 'load:invitations:failure',
        error: err.message,
      })
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      api.floats.mine(accessToken).then((floats) => {
        this.setState({loadedPlan: true, plan: floats[0]});
      }).catch((err) => {
        this.setState({loadedPlan: true, planError: err});
      })
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>floats in action</Heading>
      </View>

      <ScrollView>
        <View style={[{alignItems: 'center', justifyContent: 'center'}, base.mainWindow]}>
          { !this.state.loadedPlan ?
            <View style={{height: 50}}>
              <ActivityIndicator
                style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
                size="small"
                color={base.colors.mediumgrey}
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
          { this.state.invitations.loading ?
            <View style={{height: 50}}>
              <ActivityIndicator
                style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
                size="small"
                color={base.colors.mediumgrey}
              />
            </View>
          : this.state.invitations.error ?
            <Text style={{color: 'indianred'}}>{this.state.invitations.error}</Text>
          :
            <Invitations invitations={this.state.invitations.all}></Invitations>
          }
        </View>
      </ScrollView>
      <TabBar active="floats" navigator={this.props.navigator}/>
    </View>
  )}
}

FloatsScene.contextTypes = {
  store: React.PropTypes.object
}
