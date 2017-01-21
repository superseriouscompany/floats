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
            <View key={i} style={[base.padFullHorizontal, styles.container]}>
              <View style={styles.top}>
                <TouchableOpacity onPress={this.dismiss.bind(this)} style={styles.dismiss}>
                  <Text style={{color: base.colors.mediumgrey}}>
                    &times;
                  </Text>
                </TouchableOpacity>
                <Text style={[base.timestamp, styles.context]}>{f.user.name} sent you a float. Into it?</Text>
                <View style={styles.unread}></View>
              </View>
              <View style={styles.main}>
                <TouchableOpacity onPress={() => this.reportDialog(p)}>
                  <Image source={{url: f.user.avatar_url}} style={base.photoCircle}/>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16}}>{f.user.name} "{f.title}"</Text>
                  <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
                    {moment(f.created_at).fromNow()}
                  </Text>
                </View>
                <Zapper floatId={f.id} active={false}></Zapper>
              </View>
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
    paddingTop: 2,
    paddingBottom: 4,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 8,
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
    alignItems: 'center',
  },
  dismiss: {
  },
  unread: {
    width: 10,
    height: 10,
    backgroundColor: 'indianred',
    borderRadius: 10,
  },

})
