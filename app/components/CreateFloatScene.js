'use strict';

import React, {PropTypes} from 'react';
import Component          from '../components/Component';
import FloatDialog        from '../components/FloatDialog';
import FriendsCount       from '../components/FriendsCount';
import Heading            from '../components/Heading';
import InviteButton       from '../components/InviteButton';
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

      <View style={base.mainWindow}>
        <FloatDialog friends={this.state.friends.filter(selected)} prefillText={this.props.prefillText} clearPrefill={this.props.clearPrefill}/>

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
            <View>
              {this.props.randos.map((f, i) => (
                <Rando key={i} friend={f} />
              ))}
            </View>
          </ScrollView>
        : this.state.friends && this.state.friends.length ?
          <View style={{flex: 1}}>
            <View style={[base.padTall, base.padFullHorizontal, base.bgBreakingSection, {flexDirection: 'row'}]}>
              <View style={{flex: 1, justifyContent: 'center', paddingLeft: 9}}>
                <Text>
                  Invite Nearby Friends
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
              <View style={{paddingBottom: 20}}>
                {this.state.friends.map((f, i) => (
                  <NearbyFriend toggle={() => this.toggleFriend(f.id)} key={i} friend={f} />
                ))}
                <InviteButton/>
              </View>

              { this.props.randos && this.props.randos.length ?
                <View style={{paddingBottom: 20}}>
                  { this.state.showRandos ?
                    <View>
                      <TouchableOpacity style={[base.bgBreakingSection, styles.randoToggle]} onPress={() => this.setState({showRandos: false})}>
                        <Text style={[base.timestamp, styles.randoText]}>
                          hide nearby strangers
                        </Text>
                      </TouchableOpacity>
                      {this.props.randos.map((f, i) => (
                        <Rando key={i} friend={f} />
                      ))}
                    </View>
                  :
                    <View>
                      <TouchableOpacity style={[base.bgBreakingSection, styles.randoToggle]} onPress={() => this.setState({showRandos: true})}>
                        <Text style={[base.timestamp, styles.randoText]}>
                          show nearby strangers
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              : null }
            </ScrollView>
          </View>
        :
          null
        }
      </View>
      <RadiusSlider changeRadius={this.props.changeRadius} radius={this.props.radius}/>
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
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <Text style={[base.timestamp, {color: base.colors.mediumgrey, textAlign: 'center', paddingLeft: 25, paddingRight: 25}]}>
          No close friends were found. Invite your nearby friends to the app in order to see them here.
        </Text>
      </View>
      <InviteButton/>
    </View>
  )}
}

CreateFloatScene.propTypes = {
  loading:      PropTypes.bool,
  error:        PropTypes.string,
  changeRadius: PropTypes.func.isRequired,
  prefillText:      React.PropTypes.oneOfType([
                      React.PropTypes.string,
                      React.PropTypes.bool,
                    ]),
  clearPrefill:     PropTypes.func,
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
  randoToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: base.colors.lightgrey,
  },
  randoText: {
    paddingTop: 9,
    paddingBottom: 10,
    color: base.colors.mediumgrey
  },
});
