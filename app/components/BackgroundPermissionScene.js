import React from 'react';
import Component from '../components/Component';
import Text from './Text';
import base from '../styles/base';
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function(props) { return (
  <Image style={styles.skyBackground} source={require('../images/SkyBackground.jpg')}>
    <StatusBar barStyle="light-content"/>

    <View style={styles.backgroundSection}>
      <Balloon style={styles.leftFloat} source={require('../images/BlueFloat.png')}/>
      <Balloon style={styles.centerFloat} source={require('../images/PinkFloat.png')}/>
      <Balloon style={styles.rightFloat} source={require('../images/GreyFloat.png')}/>
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
      <TouchableOpacity style={styles.button} onPress={() => props.navigator.navigate('NotificationPermissionScene')}a>
        <Text style={styles.mainText}>
          Allow
        </Text>
      </TouchableOpacity>
    </View>
  </Image>
)}

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
       {toValue: 1, duration: 3000, delay: 2000}
     ).start();
   }

  render() {
     return (
       <Animated.Image
       style={[this.props.style, {opacity: this.state.fadeAnim}]}
       source={this.props.gender == 'woman' ? require('../images/Woman.png') : require('../images/Man.png')}>
         {this.props.children}
       </Animated.Image>
     );
   }
}

class Balloon extends Component {
  constructor(props) {
     super(props);
     this.state = {
       offsetY: new Animated.Value(20),
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
           toValue: -10,
           easing: Easing.inOut(Easing.ease),
           duration: 2500
         }
       ),
       Animated.timing(
         this.state.offsetY,
         {
           toValue: 0,
           easing: Easing.inOut(Easing.ease),
           duration: 2000
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
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftFloat: {
    marginLeft: 35,
    marginBottom: 159,
  },
  centerFloat: {
    marginRight: 35,
    marginLeft: 25,
    marginTop: 15,
  },
  rightFloat: {
    marginRight: 25,
    marginBottom: 219,
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
