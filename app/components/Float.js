'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import ConvoPreview from './ConvoPreview';
import base from '../styles/base';
import api  from '../services/api';
import { connectActionSheet } from '@exponent/react-native-action-sheet';

import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class Float extends Component {
  render() { const f = this.props.float; return (
    <View>
      <View style={styles.heading}>
        <Image source={{url: f.user.avatar_url}} style={base.miniPhotoCircle} />
        <View style={{flex: 1}}>
          <Text style={styles.floatTitle}>{f.title}”</Text>
          <Text style={styles.rightQuote}>“</Text>
        </View>
        <TouchableOpacity onPress={this.showDialog.bind(this)} style={{paddingRight: 10, paddingTop: 4, paddingBottom: 9, paddingLeft: 8}}>
          <Image source={require('../images/ThreeDotsLight.png')} />
        </TouchableOpacity>
      </View>
      { f.convos && f.convos.length ?
        <View style={{backgroundColor: 'white', borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: base.colors.lightgrey}}>
          { f.convos.map((c, key) => (
            <ConvoPreview convo={c} isCreator={true} key={key} doBottomBorder={key != f.convos.length - 1}/>
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
    const isMine  = !!this.props.float.invitees;
    this.props.showActionSheetWithOptions({
      options: [isMine ? `Delete Float` : 'Leave Float', 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (index) => {
      if( index == 1 ) { return; }
      if( isMine ) {
        Alert.alert(
          'Delete Float',
          'Are you sure?',
          [
            {text: 'Yes, delete it.', onPress: () => this.deleteFloat()},
            {text: 'No', style: 'cancel'},
          ]
        )
      } else {
        api.floats.leave(this.props.float.id).then(() => {
          this.context.store.dispatch({type: 'dirty'});
        }).catch(function(err) {
          console.error(err);
        })
      }
    })
  }

  deleteFloat() {
    return api.floats.destroy(this.props.float.id).then(() => {
      this.context.store.dispatch({type: 'dirty'});
    }).catch(function(err) {
      console.error(err);
    })
  }
}

export default connectActionSheet(Float);

Float.contextTypes = {
  store: React.PropTypes.object,
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 5,
  },
  rightQuote: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    position: 'absolute',
    left: -4,
    top: 1,
  },
  floatTitle: {
    color: base.colors.mediumgrey,
    fontSize: 12,
    flex: 1,
    paddingTop: 1,
  },
  unanswered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.lightgrey,
  },
})
