'use strict';

import React from 'react';
import moment from 'moment';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ConvoPreview extends Component {
  render() { const c = this.props.convo; return (
    <TouchableOpacity onPress={this.showConvo.bind(this)}>
      <View style={styles.container}>
        <Image source={{url: c.message.user.avatar_url}} style={styles.photoCircle}/>
        <View style={styles.message}>
          <Text style={styles.name} numberOfLines={1}>
            { c.members.length == 2 ?
              c.message.user.name
            : c.members.length == 3 ?
              `${c.message.user.name.split(' ')[0]} & 1 other`
            : c.members.length > 3 ?
              `${c.message.user.name.split(' ')[0]} & ${c.members.length - 2} others`
            : null
            }
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            { c.message.text }
          </Text>
        </View>
        <Image style={styles.rightArrow} source={require('../images/RightArrowLight.png')}/>
        <Text style={[base.timestamp, styles.time]}>
          { moment(c.message.created_at).format('h:mma') }
        </Text>
      </View>
    </TouchableOpacity>
  )}

  showConvo() {
    this.context.store.dispatch({
      type: 'navigation:queue',
      route: 'MessagesScene',
      payload: this.props.convo,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
  },
  time: {
    color: base.colors.mediumdarkgrey,
    position: 'absolute',
    right: 12,
    bottom: 4,
    fontSize: 12,
  },
  text: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.small,
    paddingRight: 35,
  },
  photoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 16,
    marginBottom: 17
  },
  rightArrow: {
    marginLeft: 14,
    marginRight: 12,
  }
})

ConvoPreview.contextTypes = {
  store: React.PropTypes.object,
}
