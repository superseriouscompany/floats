import React from 'react'
import Text from './Text'
import base from '../styles/base';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) { return (
  <Image style={styles.skyBackground} source={require('../images/SkyBackground.jpg')}>
    <StatusBar
       backgroundColor="blue"
       barStyle="light-content"
     />
    <View style={styles.backgroundSection}>
      <Image style={styles.leftFloat} source={require('../images/BlueFloat.png')}/>
      <View style={styles.centerFloat}>
        <Image source={require('../images/PinkFloat.png')}/>
      </View>
      <Image style={styles.rightFloat} source={require('../images/GreyFloat.png')}/>
      <View style={styles.peopleRow}>
        <View style={{flex: .5, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image source={require('../images/Person.png')} style={{marginLeft: 26}}/>
        </View>
        <View style={{flex: .5, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Image source={require('../images/Person.png')} style={{marginRight: 48}}/>
          <Image source={require('../images/Person.png')} style={{marginRight: 18}}/>
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
    marginBottom: 164,
  },
  centerFloat: {
    marginRight: 35,
    marginLeft: 25,
    marginTop: 10,
  },
  rightFloat: {
    marginRight: 25,
    marginBottom: 224
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
