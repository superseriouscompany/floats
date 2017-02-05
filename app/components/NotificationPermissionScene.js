import React from 'react';
import Component from '../components/Component';
import Text from './Text';
import base from '../styles/base';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function(props) { return (
  <Image style={styles.skyBackground} source={require('../images/SkyBackground.jpg')}>
    <StatusBar barStyle="light-content"/>

    <View style={styles.backgroundSection}>
      <BalloonWithMembers style={styles.floatWithMembers} source={require('../images/FloatWithMembers.png')}/>

      <View style={styles.peopleRow}>
        <Person/>
      </View>
    </View>

    <View style={styles.textSection}>
      <Text style={styles.mainText}>
        If your friends want to tag along, they&#39;ll message you through the app
      </Text>
      <Text style={styles.subText}>
        you can leave a float at any time
      </Text>
    </View>

    <TouchableOpacity style={styles.button} onPress={() => props.navigator.navigate('CreateFloatScene')}>
      <Text style={[styles.mainText, {}]}>
        Allow Notifications
      </Text>
      <View style={styles.rightArrow}>
        <Image source={require('../images/RightArrowLight.png')}/>
      </View>
    </TouchableOpacity>
  </Image>
)}

class BalloonWithMembers extends Component {
  constructor(props) {
     super(props);
     this.state = {
       fadeAnim: new Animated.Value(0),
       offsetX: new Animated.Value(screenWidth/4 * -1),
     };
   }

   componentDidMount() {
     Animated.parallel([
       Animated.timing(
         this.state.fadeAnim,
         {toValue: 1, duration: 1000, delay: 100}
       ),
       Animated.timing(
         this.state.offsetX,
         {toValue: 417, duration: 40000, easing: Easing.linear}
       )
     ]).start();
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

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1, duration: 3000, delay: 1000}
    ).start();
  }

  render() {
     return (
       <Animated.Image
       style={{opacity: this.state.fadeAnim}}
       source={require('../images/PersonHandsUp.png')}>
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
    flex: 0.666,
  },
  floatWithMembers: {

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
  textSection: {
    flex: 0.333,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 68,
  },
  mainText: {
    textAlign: 'center',
  },
  subText: {
    color: base.colors.mediumlightgrey,
    fontSize: base.fontSizes.small,
    textAlign: 'center',
    paddingTop: 5,
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    height: 65,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 15,
    justifyContent: 'center'
  }
})
