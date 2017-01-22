'use strict';

import React from 'react';
import FCM from 'react-native-fcm';
import Heading from './Heading';
import Component from './Component';
import Logo from './Logo';
import FriendsCount from './FriendsCount';
import NearbyFriend from './NearbyFriend';
import FloatDialog from './FloatDialog';
import TabBar from './TabBar';
import Text from './Text';
import base from '../styles/base';
import api  from '../services/api';
import {
  AsyncStorage,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class CreateFloatScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      friends: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      FCM.requestPermissions();
      // FIXME: retry as long as it's not set
      FCM.getFCMToken().then( (token) => {
        if( !token ) { return console.warn("No firebase token available."); }
        api.sessions.updateFirebaseToken(accessToken, token);
      });
      FCM.on('refreshToken', (token) => {
        if( !token ) { return console.warn("No firebase token on refresh."); }
        api.sessions.updateFirebaseToken(accessToken, token);
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          api.pins.create(accessToken, {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }).then(function() {
            return api.friends.nearby(accessToken);
          }).then((friends) => {
            friends = friends.map(function(f) {
              f.selected = true;
              return f;
            })
            this.setState({friends: friends, loaded: true, allSelected: true});
          }).catch(function(err) {
            return console.error(err);
          })
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }).catch((err) => {
      this.setState({error: err, loaded: true});
    })
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>do something</Heading>
      </View>

      <View style={base.mainWindow}>
        { !this.state.loaded ?
          <ActivityIndicator
            style={[base.loadingCenter, {transform: [{scale: 1.25}]}]}
            size="small"
            color={base.colors.mediumgrey}
          />
        : this.state.error ?
          <Text style={{color: 'indianred', textAlign: 'center'}}>{this.state.error}</Text>
        : !this.state.friends.length ?
          <View style={{alignItems: 'center'}}>
            <View style={[base.bgBreakingSection, {alignSelf: 'stretch', alignItems: 'center', paddingTop: 6, paddingBottom: 7, borderBottomWidth: 0.5, borderColor: base.colors.mediumgrey}]}>
              <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
                no nearby friends
              </Text>
            </View>
            <View style={{alignItems: 'center', paddingTop: 13, paddingBottom: 15, }}>
              <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center'}]}>
                floats works best when you’ve got{"\n"}your closest friends.
              </Text>
            </View>
            <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('RandosScene')}>
              <Text style={styles.emptyButtonText}>
                add friends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color3}]} onPress={() => this.copyToClipboard()}>
              <Text style={styles.emptyButtonText}>
                invite someone
              </Text>
            </TouchableOpacity>
          </View>
        :
          <View>
            <FloatDialog friends={this.state.friends.filter(selected)} />
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection, {flexDirection: 'row'}]}>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 9}}>
              <Text>
                Nearby Friends
              </Text>
              </View>
              <TouchableOpacity onPress={this.toggleAll.bind(this)}>
                { this.state.allSelected ?
                  <Image source={require('../images/Checked.png')} />
                  :
                  <Image source={require('../images/EmptyCircle.png')} />
                }
              </TouchableOpacity>
            </View>
            <ScrollView>
              {this.state.friends.map((f, i) => (
                <NearbyFriend toggle={() => this.toggleFriend(f.id)} key={i} friend={f} />
              ))}
            </ScrollView>
          </View>
        }
      </View>
      <TabBar active="createFloat" navigator={this.props.navigator}/>
    </View>
  )}

  toggleAll() {
    const on = !this.state.allSelected;
    const friends = this.state.friends.map((function(f) {
      f.selected = on;
      return f;
    }));

    this.setState({friends: friends, allSelected: on});
  }

  toggleFriend(id) {
    let friends = [].concat(this.state.friends);
    for( var i = 0; i < friends.length; i++ ) {
      if( friends[i].id == id ) {
        friends[i].selected = !friends[i].selected;
      }
    }
    const allSelected = friends.filter(selected).length == friends.length;

    this.setState({friends: friends, allSelected: allSelected});
  }

  copyToClipboard() {
    alert('not implemented');
  }
}

function selected(f) {
  return !!f.selected;
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
