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
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default class FloatsScene extends Component {
  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>floats</Heading>
      </View>

      <View style={[base.mainWindow, {backgroundColor: '#FAF9F8'}]}>
        { this.props.empty ?
            <View style={{alignItems: 'center'}}>
              <View style={{alignItems: 'center', paddingTop: 18, paddingBottom: 15}}>
                <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center'}]}>
                  be the first of your friends to suggest{"\n"}something to do today
                </Text>
              </View>
              <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('CreateFloatScene')}>
                <Text style={styles.emptyButtonText}>
                  float somethin&#39;
                </Text>
              </TouchableOpacity>
            </View>
        :
          <ScrollView
            refreshControl={<RefreshControl tintColor={base.colors.mediumgrey} refreshing={this.props.invitations.loading || this.props.myFloats.loading || this.props.convos.loading} onRefresh={this.props.refresh} />}>
            <View>
              { this.props.invitations.error ?
                <Text style={{color: 'indianred'}}>{this.props.invitations.error}</Text>
              : this.props.invitations.loading ?
                null
              : this.props.invitations.all.filter((i) => { return !i.attending;}).length ?
                <View style={{flex: 1, backgroundColor: base.colors.color2, paddingTop: 10}}>
                  <Invitations invitations={this.props.invitations.all.filter((i) => { return !i.attending;})} />
                </View>
              : null
              }
            </View>

            { this.props.inbox ?
              <Inbox inbox={this.props.inbox} />
            : null
            }
          </ScrollView>
        }
      </View>
      <TabBar active="floats" navigator={this.props.navigator}/>
    </View>
  )}
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
