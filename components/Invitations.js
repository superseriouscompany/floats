'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import Zapper from './Zapper';
import base from '../styles/base';
import moment from 'moment';
import {
  ActionSheetIOS,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Invitations extends Component {
  dismiss() {
    alert('not implemented');
  }

  render() { return (
    <View>
      { !this.props.invitations || !this.props.invitations.length ?
        <View style={{alignItems: 'center', paddingTop: 9, paddingBottom: 10 }}>
          <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>no pending invitations</Text>
        </View>
      :
        <View>
          {this.props.invitations.map((f, i) => (
            <View key={i} style={styles.container}>
              <View style={styles.top}>
                <TouchableOpacity onPress={this.dismiss.bind(this)} style={styles.dismiss}>
                  <Image source={require('../images/XLight.png')} />
                </TouchableOpacity>
                <Text style={[base.timestamp, styles.context, {fontSize: 12}]}>{f.user.name} sent you a float. Into it?</Text>
                <View style={styles.unread}></View>
              </View>
              <View style={styles.main}>
                <TouchableOpacity onPress={() => this.reportDialog(p)}>
                  <Image source={{url: f.user.avatar_url}} style={{width: 45, height: 45, borderRadius: 23, marginRight: 10, borderColor: base.colors.lightgrey, borderWidth: 0.5}}/>
                </TouchableOpacity>
                <View style={{flex: 1, paddingRight: 45}}>
                  <Text style={{fontSize: 16}}>"{f.title}"</Text>
                  <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
                    {moment(f.created_at).fromNow()}
                  </Text>
                </View>
              </View>
              <Zapper floatId={f.id} active={false}></Zapper>
            </View>
          ))}
        </View>
      }
    </View>
  )}

  reportDialog(p) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [`Report ${p.user.name}`, 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index == 0 ) {
        alert(`You have reported ${p.user.name} for floating ${p.title}`);
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 22,
    paddingRight: 13,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 11,
    marginRight: 11,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  context: {
    color: base.colors.mediumgrey,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 13,
  },
  dismiss: {
  },
  unread: {
    width: 8,
    height: 8,
    backgroundColor: base.colors.color1,
    borderRadius: 4,
  },

})
