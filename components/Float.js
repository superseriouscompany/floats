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
        <Image source={{url: f.user.avatar_url}} style={[base.miniPhotoCircle]} />
        <Text style={styles.floatTitle}>"{f.title}"</Text>
        <TouchableOpacity onPress={this.showDialog.bind(this)}>
          <Text style={styles.overflow}>●●●</Text>
        </TouchableOpacity>
      </View>
      { f.convos && f.convos.map((c, key) => (
        <ConvoPreview convo={c} key={key} />
      ))}
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
    paddingBottom: 5,
  },
  floatTitle: {
    color: 'darkgrey',
    fontSize: 12,
    flex: 1,
  },
  overflow: {
    color: 'darkgrey',
    fontSize: 12,
  }
})
