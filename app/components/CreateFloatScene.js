'use strict';

import React, {PropTypes} from 'react';
import Component          from '../components/Component';
import FloatDialog        from '../components/FloatDialog';
import FriendsCount       from '../components/FriendsCount';
import Heading            from '../components/Heading';
import Logo               from '../components/Logo';
import NearbyFriend       from '../components/NearbyFriend';
import RadiusSlider       from '../components/RadiusSlider';
import Rando              from '../components/Rando';
import TabBar             from '../components/TabBar';
import Text               from '../components/Text';
import base               from '../styles/base';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
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
      <View style={base.header}>
        <Heading>friends nearby</Heading>
      </View>

      <View style={base.mainWindow}>
        { this.props.error ?
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{alignSelf: 'stretch', alignItems: 'center', paddingTop: 6, paddingBottom: 7, backgroundColor: base.colors.darkgrey}} onPress={this.props.refresh}>
              <Text style={[base.timestamp, {color: base.colors.white}]}>
                Error: {this.props.error}. Try again?
              </Text>
            </TouchableOpacity>
          </View>
        : this.state.friends && !this.state.friends.length ?
          <ScrollView style={{flex: 1}} refreshControl={<RefreshControl tintColor={base.colors.mediumlightgrey} refreshing={this.props.loading || false} onRefresh={this.props.refresh} colors={[base.colors.mediumlightgrey]}/>}>
            <Ronery navigator={this.props.navigator} />
          </ScrollView>
        : this.state.friends && this.state.friends.length ?
          <View style={{flex: 1}}>
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
            <ScrollView style={{flex: 1}}
             refreshControl={<RefreshControl tintColor={base.colors.mediumlightgrey} refreshing={this.props.loading} onRefresh={this.props.refresh} colors={[base.colors.mediumlightgrey]}/>}>
              <RadiusSlider changeRadius={this.props.changeRadius}/>
              {this.state.friends.map((f, i) => (
                <NearbyFriend toggle={() => this.toggleFriend(f.id)} key={i} friend={f} />
              ))}

              <View style={styles.randosContainer}>
                { this.state.showRandos ?
                  <View>
                    <TouchableOpacity onPress={() => this.setState({showRandos: false})}>
                      <Text style={styles.randosText}>
                        Hide Randos
                      </Text>
                    </TouchableOpacity>
                    {this.props.randos.map((f, i) => (
                      <Rando key={i} friend={f} />
                    ))}
                  </View>
                :
                  <View>
                    <TouchableOpacity onPress={() => this.setState({showRandos: true})}>
                      <Text style={styles.randosText}>
                        Show Randos...
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
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
  render() { return(
    <View style={{alignItems: 'center'}}>
      <View style={[base.bgBreakingSection, {alignSelf: 'stretch', alignItems: 'center', paddingTop: 6, paddingBottom: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: base.colors.mediumgrey}]}>
        <Text style={[base.timestamp, {color: base.colors.mediumgrey}]}>
          no nearby friends
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingTop: 13, paddingBottom: 15}}>
        <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center', paddingLeft: 25, paddingRight: 25}]}>
          Add or invite your nearby friends, so you can send them floats.
        </Text>
      </View>

      <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={() => this.props.navigator.navigate('RandosScene')}>
        <Text style={styles.emptyButtonText}>
          add friends
        </Text>
      </TouchableOpacity>
    </View>
  )}
}

CreateFloatScene.propTypes = {
  loading:      PropTypes.bool,
  error:        PropTypes.string,
  changeRadius: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.string,
    avatar_url: PropTypes.string,
    name:       PropTypes.string,
  })),
  randos: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.string,
    avatar_url: PropTypes.string,
    name:       PropTypes.string,
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
  randosContainer: {
    borderTopWidth: 1,
    borderTopColor: 'slateblue',
    paddingTop: base.paddings.normal,
    marginTop: 20,
  },
  randosText: {
    paddingLeft: base.paddings.normal,
    color: 'salmon'
  },
});
