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
        If they can make it to your plan, they’ll message you through the app
      </Text>
      <Text style={styles.subText}>
        you can leave a float at any time
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigator.navigate('CreateFloatScene')}>
        <Text style={styles.mainText}>
          Allow
        </Text>
      </TouchableOpacity>
    </View>
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
         {toValue: 1, duration: 4000, delay: 100}
       ),
       Animated.timing(
         this.state.offsetX,
         {toValue: 417, duration: 40000, easing: Easing.inOut(Easing.ease)}
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
      {toValue: 1, duration: 3000, delay: 10000}
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
    flex: 0.65,
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
    flex: 0.35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 48,
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
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    height: 50,
    borderWidth: 1,
    borderColor: base.colors.lightgrey,
  },
})
