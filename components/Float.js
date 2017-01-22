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
        <View style={{flex: 1}}>
          <Text style={styles.floatTitle}>{f.title}”</Text>
          <Text style={styles.rightQuote}>“</Text>
        </View>
        <TouchableOpacity onPress={this.showDialog.bind(this)} style={{paddingRight: 8, paddingTop: 6.5, paddingBottom: 7.5, paddingLeft: 8}}>
          <Image source={require('../images/ThreeDotsLight.png')} />
        </TouchableOpacity>
      </View>
      { f.convos && f.convos.length ?
        <View style={{backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: base.colors.lightgrey, marginBottom: 10}}>
          { f.convos.map((c, key) => (
            <ConvoPreview convo={c} key={key} doBottomBorder={(key == f.convos.length - 1) ? 0 : 1}/>
          ))}
        </View>
      : f.invitees && f.invitees.length ?
        <View style={styles.unanswered}>
          <Image source={require('../images/GreenCheck.png')} style={{position: 'absolute', marginTop: 7.5, marginLeft: 17, left: 0}}/>
          <Text style={{fontSize: base.fontSizes.small, color: base.colors.mediumgrey}}>
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
    alignItems: 'flex-end',
    paddingTop: 2,
    paddingBottom: 5,
  },
  rightQuote: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    position: 'absolute',
    left: -4.5,
  },
  floatTitle: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    flex: 1,
  },
  unanswered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: base.colors.lightgrey,
  },
})
