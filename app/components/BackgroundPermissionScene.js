import React from 'react';
import Component from '../components/Component';
import Text from './Text';
import base from '../styles/base';
import api from '../services/api';
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default class BackgroundPermissionScene extends Component {
  constructor(props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
  }

  showDialog() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        api.pins.create({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        this.props.navigator.navigate('NotificationPermissionScene')
      },
      (error) => {
        this.props.navigator.navigate('NotificationPermissionScene')
      },
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
    )
  }

  render() { return (
  <Image style={styles.skyBackground} source={require('../images/SkyBackground.jpg')}>
    <StatusBar barStyle="light-content"/>

    <View style={styles.backgroundSection}>
      <Balloon style={styles.leftFloat} lag={2} source={require('../images/BlueFloat.png')}/>
      <Balloon style={styles.centerFloat} lag={1} source={require('../images/PinkFloat.png')}/>
      <Balloon style={styles.rightFloat} lag={3} source={require('../images/GreyFloat.png')}/>
      <View style={styles.peopleRow}>
        <View style={styles.rowLeft}>
          <Person style={{marginLeft: 26}} gender="female"/>
        </View>
        <View style={styles.rowRight}>
          <Person style={{marginRight: 48}} gender="female"/>
          <Person style={{marginRight: 18}} gender="male"/>
        </View>
      </View>
    </View>

    <View style={styles.textSection}>
      <Text style={styles.mainText}>
        Floats suggests nearby friends to bring along to your adventures
      </Text>
      <Text style={styles.subText}>
        your location is never shared
      </Text>

      <TouchableOpacity style={styles.emptyButtons} onPress={this.showDialog}>
        <Text style={styles.emptyButtonText}>
          allow location
        </Text>
      </TouchableOpacity>
    </View>
  </Image>
  )}
}

class Person extends Component {
  constructor(props) {
     super(props);
     this.state = {
       offsetY: new Animated.Value(0),
     };
   }

  render() {
     return (
       <Animated.Image
       style={[this.props.style, {transform: [{translateY: this.state.offsetY}]}]}
       source={this.props.gender == 'female' ? require('../images/Woman.png') : require('../images/Man.png')}>
         {this.props.children}
       </Animated.Image>
     );
   }
}

class Balloon extends Component {
  constructor(props) {
     super(props);
     this.state = {
       offsetY: new Animated.Value(0),
     };
   }

   componentDidMount() {
     this.cycleAnimation();
   }

   cycleAnimation() {
     Animated.sequence([
       Animated.timing(
         this.state.offsetY,
         {
           toValue: -20 + (this.props.lag * 3),
           easing: Easing.inOut(Easing.ease),
           duration: 2700 + (this.props.lag * 100)
         }
       ),
       Animated.timing(
         this.state.offsetY,
         {
           toValue: 0,
           easing: Easing.inOut(Easing.ease),
           duration: 2500 + (this.props.lag * 100)
         }
       )
     ]).start(event => {
       if (event.finished) { this.cycleAnimation(); }
     });
   }

   render() {
     return (
       <Animated.Image
       style={[this.props.style, {transform: [{translateY: this.state.offsetY}]}]}
       source={this.props.source}>
         {this.props.children}
       </Animated.Image>
     );
   }
}



const styles = StyleSheet.create({
  skyBackground: {
    flex: 1,
    width: null,
    height: null,
  },
  backgroundSection: {
    flex: 0.58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftFloat: {
    marginLeft: 35,
    marginBottom: 149,
  },
  centerFloat: {
    marginRight: 35,
    marginLeft: 25,
    marginTop: 35,
  },
  rightFloat: {
    marginRight: 25,
    marginBottom: 200,
  },
  peopleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  rowLeft: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rowRight: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textSection: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 30,
    paddingBottom: 30,
  },
  mainText: {
    textAlign: 'center',
  },
  subText: {
    color: base.colors.mediumgrey,
    fontSize: base.fontSizes.small,
    textAlign: 'center',
    paddingTop: 5,
  },
  emptyButtons: {
    width: 200,
    height: 50,
    borderRadius: 100,
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: base.colors.mediumlightgrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButtonText: {
    color: base.colors.darkgrey,
    textAlign: 'center'
  },
})
