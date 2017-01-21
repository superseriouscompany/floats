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

    this.state = {
      myFloats:    {loading: true},
      invitations: {loading: true},
    }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
      const state = this.context.store.getState();
      this.setState({
        invitations: state.invitations,
        myFloats: state.myFloats,
      });
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>floats in action</Heading>
      </View>

      <ScrollView>
        <View style={[{alignItems: 'center', justifyContent: 'center'}, base.mainWindow]}>
          { this.state.myFloats.loading ?
            <View style={{height: 50}}>
              <ActivityIndicator
                style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
                size="small"
                color={base.colors.mediumgrey}
              />
            </View>
          : this.state.myFloats.error ?
            <Text style={{color: 'indianred'}}>{this.state.myFloats.error}</Text>
          : this.state.myFloats.all && this.state.myFloats.all.length ?
            <YourPlan plan={this.state.myFloats.all[0]}></YourPlan>
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
