'use strict';

import React from 'react';
import moment from 'moment';
import Component from './Component';
import Text from './Text';
import Zapper from './Zapper';
import base from '../styles/base';
import api from '../services/api';

import {
  ActionSheetIOS,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Invitations extends Component {
  dismiss(float) {
    api.floats.leave(float.id).then(() => {
      this.context.store.dispatch({type: 'dirty'});
    }).catch(function(err) {
      console.error(err);
    })
  }

  render() { return (
    <View>
      { this.props.invitations && this.props.invitations.length ?
        <View>
          {this.props.invitations.map((f, i) => (
            <View key={i} style={styles.container}>

              <View style={styles.top}>
                <Text style={[base.timestamp, styles.context, {fontSize: 12}]}>{f.user.name.split(' ')[0]} sent you a float</Text>
              </View>

              <TouchableOpacity onPress={() => this.dismiss(f)} style={{position: 'absolute', marginLeft: 13, marginTop: 9.5, paddingLeft: 12, paddingRight: 10}}>
                <Image source={require('../images/XLight.png')} />
              </TouchableOpacity>

              { i.unread || true ?
                <View style={styles.unread}></View>
              :
                null
              }

              <View style={styles.main}>
                <TouchableOpacity onPress={() => this.reportDialog(f)}>
                  <Image source={{url: f.user.avatar_url}} style={styles.photoCircle}/>
                </TouchableOpacity>
                <View style={{flex: 1, paddingRight: 45, marginLeft: 2.5}}>
                  <Text style={{fontSize: 16}}>{f.title}”</Text>
                  <Text style={styles.rightQuote}>“</Text>
                  <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
                    {moment(f.created_at).fromNow()}
                  </Text>
                </View>
              </View>
              <Zapper floatId={f.id} active={false}></Zapper>
            </View>
          ))}
        </View>
      :
        null
      }
    </View>
  )}

  reportDialog(f) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [`Report ${f.user.name}`, 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index == 0 ) {
        alert(`You have reported ${f.user.name} for floating ${f.title}`);
      }
    })
  }
}

Invitations.contextTypes = {
  store: React.PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 22,
    paddingRight: 13,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 11,
    marginRight: 11,
    borderColor: base.colors.lightgrey,
    borderWidth: StyleSheet.hairlineWidth,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  context: {
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingTop: 1.25,
    color: base.colors.mediumlightgrey,
  },
  rightQuote: {
    color: base.colors.darkgrey,
    fontSize: 16,
    position: 'absolute',
    left: -6,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 13,
  },
  dismiss: {
  },
  unread: {
    position: 'absolute',
    top: 11,
    right: 13,
    width: 8,
    height: 8,
    backgroundColor: base.colors.color3,
    borderRadius: 4,
    marginTop: -.25,
  },
  photoCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 10,
    borderColor: base.colors.lightgrey,
    borderWidth: StyleSheet.hairlineWidth,
  },
})
