'use strict';

import _ from 'lodash';
import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Heading from './Heading';
import Invitations from './Invitations';
import TabBar from './TabBar';
import Text from './Text';
import Inbox from './Inbox';
import {
  ActionSheetIOS,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default class FloatsScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invitations: {loading: true},
      myFloats:    {loading: true},
    }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.refreshState.bind(this));
    this.refreshState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  refreshState() {
    const state = this.context.store.getState();
    const inbox = generateInbox(state.invitations, state.myFloats, state.convos);
    const isEmpty = inbox && !inbox.length && state.invitations.all && !state.invitations.all.length;

    this.setState({
      invitations: state.invitations,
      myFloats:    state.myFloats,
      convos:      state.convos,
      inbox:       inbox,
      empty:       isEmpty,
    });
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>floats</Heading>
      </View>

      <View style={[base.mainWindow, {backgroundColor: '#FAF9F8'}]}>
        { this.state.empty ?
            <View style={{alignItems: 'center'}}>
              <View style={{alignItems: 'center', paddingTop: 18, paddingBottom: 15}}>
                <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center'}]}>
                  be the first of your friends to suggest{"\n"}something to do today
                </Text>
              </View>
              <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('RandosScene')}>
                <Text style={styles.emptyButtonText}>
                  float somethin&#39;
                </Text>
              </TouchableOpacity>
            </View>
        :
          <ScrollView style={{paddingTop: 10}}>
            <View>
              { this.state.invitations.loading || this.state.myFloats.loading || this.state.convos.loading ?
                <View style={{height: 50}}>
                  <ActivityIndicator
                    style={[base.loadingTop, {transform: [{scale: 1.25}]}]}
                    size="small"
                    color={base.colors.mediumgrey}
                  />
                </View>
              :
                null
              }
              { this.state.invitations.error ?
                <Text style={{color: 'indianred'}}>{this.state.invitations.error}</Text>
              : this.state.invitations.loading ?
                null
              : this.state.invitations.all && this.state.invitations.all.length ?
                <View style={{flex: 1, borderBottomWidth: 0.5, borderColor: base.colors.lightgrey, marginBottom: 8}}>
                  <Invitations invitations={this.state.invitations.all.filter((i) => { return !i.attending;})} />
                </View>
              : null
              }
            </View>

            { this.state.inbox ?
              <Inbox inbox={this.state.inbox} />
            : null
            }
          </ScrollView>
        }
      </View>
      <TabBar active="floats" navigator={this.props.navigator}/>
    </View>
  )}
}

function generateInbox(invitations, myFloats, convos) {
  if( !invitations.all || !myFloats.all || !convos.all ) { return null; }

  let floats = [];

  invitations.all.forEach(function(i) {
    if( !i.attending ) { return; }
    floats[i.id] = {
      ...i,
      time: i.created_at,
    }
  });

  myFloats.all.forEach(function(f) {
    floats[f.id] = {
      ...f,
      time: f.created_at,
    }
  })

  convos.all.forEach(function(c) {
    floats[c.float_id].convos = floats[c.float_id].convos || [];
    floats[c.float_id].convos.push(c);
    floats[c.float_id].time = Math.max(floats[c.float_id].time, c.message.created_at);
  })

  return _.values(floats).sort(function(a, b) {
    return a.time < b.time;
  })
}

FloatsScene.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  emptyButtons: {
    width: 200,
    height: 50,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButtonText: {
    color: 'white',
    textAlign: 'center'
  },
});
