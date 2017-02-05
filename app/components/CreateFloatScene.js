'use strict';

import React, {PropTypes} from 'react';
import Heading            from '../components/Heading';
import Component          from '../components/Component';
import Logo               from '../components/Logo';
import FriendsCount       from '../components/FriendsCount';
import NearbyFriend       from '../components/NearbyFriend';
import FloatDialog        from '../components/FloatDialog';
import TabBar             from '../components/TabBar';
import Text               from '../components/Text';
import base               from '../styles/base';
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class CreateFloatScene extends Component {
  constructor(props) {
    super(props);
    this.state = {allSelected: true, friends: props.friends};
  }

  componentWillReceiveProps(props) {
    this.setState({
      friends: props.friends,
    })
  }

  render() { return (
    <View style={base.screen}>
      <StatusBar barStyle="dark-content"/>
      <View style={base.header}>
        <Heading>friends nearby</Heading>
      </View>

      <View style={base.mainWindow}>
        { this.props.error ?
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'indianred', textAlign: 'center', marginBottom: 10, marginTop: 10}}>{this.props.error}</Text>
            <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={this.props.refresh}>
              <Text style={styles.emptyButtonText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        : this.state.friends && !this.state.friends.length ?
          <Ronery navigator={this.props.navigator}/>
        : this.state.friends && this.state.friends.length ?
          <View style={{flex: 1}}>
            <FloatDialog friends={this.state.friends.filter(selected)} />
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection, {flexDirection: 'row', backgroundColor: 'white'}]}>
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
            <ScrollView style={{flex: 1}}
             refreshControl={<RefreshControl tintColor={base.colors.mediumlightgrey} refreshing={this.props.loading} onRefresh={this.props.refresh} colors={[base.colors.mediumlightgrey]}/>}>
             {this.state.friends.map((f, i) => (
               <NearbyFriend toggle={() => this.toggleFriend(f.id)} key={i} friend={f} />
             ))}
            </ScrollView>

          </View>
        :
          null
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
}

function selected(f) {
  return !!f.selected;
}

class Ronery extends Component {
  copyToClipboard() {
    Clipboard.setString('https://itunes.apple.com/us/app/floats-find-close-friends/id1195463981?mt=8');
    Alert.alert('Copied app link to clipboard.');
  }

  render() { return(
    <View style={{alignItems: 'center'}}>
      <View style={[base.bgBreakingSection, {alignSelf: 'stretch', alignItems: 'center', paddingTop: 6, paddingBottom: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: base.colors.mediumgrey}]}>
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
  )}
}

CreateFloatScene.propTypes = {
  loading: PropTypes.bool,
  error:   PropTypes.string,
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    avatar_url: PropTypes.string,
    name: PropTypes.string,
  }))
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
