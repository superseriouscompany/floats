'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import ConvoPreview from './ConvoPreview';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Float extends Component {
  render() { const f = this.props.float; return (
    <View>
      <View style={styles.heading}>
        <Image source={{url: f.user.avatar_url}} style={base.miniPhotoCircle} />
        <Text style={styles.floatTitle}>"{f.title}"</Text>
        <TouchableOpacity onPress={this.showDialog.bind(this)} style={{paddingRight: 8, paddingTop: 7, paddingBottom: 7, paddingLeft: 8}}>
          <Image source={require('../images/ThreeDotsLight.png')} />
        </TouchableOpacity>
      </View>
      { f.convos && f.convos.length ?
        <View>
          { f.convos.map((c, key) => (
            <ConvoPreview convo={c} key={key} />
          ))}
        </View>
      : f.invitees && f.invitees.length ?
        <View style={styles.unanswered}>
          <Text style={styles.check}>✔</Text>
          <Text>
            delivered to {f.invitees.length}
            { f.invitees.length == 1 ? ' friend' : ' friends' }
          </Text>
        </View>
      : null
      }
    </View>
  )}

  showDialog() {
    alert('Not implemented');
  }
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 4,
  },
  floatTitle: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    flex: 1,
  },
  unanswered: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
  },
  check: {
    color: 'lawngreen',
    fontSize: 16,
  },
})
