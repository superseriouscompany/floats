'use strict';

import React from 'react';
import Text  from './Text';
import Float     from './Float';
import Attendee from './Attendee';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import {
  Image,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

export default class YourPlan extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const plan = this.props.plan;
    if( !plan ) { return null; }
    return (
    <View style={[{flexDirection: 'row', paddingBottom: 18, backgroundColor: base.colors.offwhite, borderBottomWidth: 0.5, borderBottomColor: base.colors.lightgrey}, base.padFullHorizontal, base.padMainItem]}>
      <Image source={{url: plan.user.avatar_url}} style={base.photoCircle} />
      <View style={{flex: 1}}>
        <Float plan={plan} attendees={plan.attendees}/>
        { plan.attendees && plan.attendees.length ?
          <View>
            <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>text them to coordinate</Text>
            <TouchableOpacity onPress={this.deletePlan.bind(this)}>
              <Text style={[base.timestamp, {textDecorationLine: 'underline', color: base.colors.mediumgrey}]}>or delete your float</Text>
            </TouchableOpacity>
          </View>
        :
          <View>
            <TouchableOpacity onPress={this.deletePlan.bind(this)}>
              <Text style={[base.timestamp, {textDecorationLine: 'underline', color: base.colors.mediumgrey}]}>delete your float</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )}

  deletePlan() {
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      return api.floats.destroy(accessToken, this.props.plan.id).then(function() {
        alert("Deleted");
      });
    }).catch(function(err) {
      alert(err);
      console.error(err);
    })
  }
}
