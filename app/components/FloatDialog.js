'use strict';

import React from 'react';
import Component from './Component';
import base from '../styles/base';
import api from '../services/api';
import Text from './Text';
import {
  Animated,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class FloatDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() { return (
    <View style={styles.container}>
      <SkyPan style={{position: 'absolute'}} source={require('../images/DarkSkyBackground.jpg')}/>
      <View style={[styles.inputContainer]}>
        <TextInput style={[styles.input]} placeholder="doing something fun?" placeholderTextColor={base.colors.offwhite} underlineColorAndroid={'transparent'} onChangeText={(text) => this.setState({text})}/>
      </View>
      { this.state.sending ?
        <ActivityIndicator
          style={base.airplaneLoader}
          size="small"
          color={base.colors.mediumgrey}
        />
      :
        <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}onPress={this.create.bind(this)}>
          <Text style={[styles.input, {fontWeight: '500'}]}>send</Text>
        </TouchableOpacity>
      }
    </View>
  )}

  create() {
    if( !this.state.text ) { return; }
    if( !this.props.friends.length ) { return; }

    this.setState({sending: true});

    AsyncStorage.getItem('@floats:accessToken').then((accessToken) => {
      const friends = this.props.friends.map(function(f) {
        return f.id
      })
      return api.floats.create(friends, this.state.text)
    }).then(() => {
      this.context.store.dispatch({type: 'navigation:queue', route: 'FloatsScene'});
      this.context.store.dispatch({type: 'dirty'});
    }).catch((err) => {
      this.setState({sending: false});
      Alert.alert(err.message);
      console.error(err);
    })
  }
}

class SkyPan extends Component {
  constructor(props) {
     super(props);
     this.state = {
       offsetX: new Animated.Value(0),
     };
   }

   componentDidMount() {
     this.cycleAnimation();
   }

   cycleAnimation() {
     Animated.sequence([
       Animated.timing(
         this.state.offsetX,
         {toValue: -1216 + screenWidth, duration: 60000, easing: Easing.inOut(Easing.ease)}
       ),
       Animated.timing(
         this.state.offsetX,
         {toValue: 0, duration: 60000, easing: Easing.inOut(Easing.ease)}
       ),
     ]).start(event => {
       if (event.finished) { this.cycleAnimation(); }
     });
   }

   render() {
     return (
       <Animated.Image
       style={[this.props.style, {opacity: this.state.fadeAnim, transform: [{translateX: this.state.offsetX}]}]}
       source={this.props.source}>
         {this.props.children}
       </Animated.Image>
     );
   }
}

FloatDialog.contextTypes = {
  store: React.PropTypes.object,
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: base.colors.white,
    marginRight: 16,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: base.colors.white,
    height: 30,
    paddingTop: 2,
    paddingLeft: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: base.colors.white,
  },
})
