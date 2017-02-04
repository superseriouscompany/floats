import React from 'react'
import Text from './Text'
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

export default function(props) { return (
  <Image style={styles.skyBackground} source={require('../images/SkyBackground.jpg')}>
    <StatusBar
       backgroundColor="blue"
       barStyle="light-content"
     />
    <View style={styles.backgroundSection}>
    </View>
    <View style={styles.textSection}>
      <Text onPress={() => props.navigator.navigate('NotificationPermissionScene')}>
        Background Permissions
      </Text>
    </View>
  </Image>
)}

const styles = StyleSheet.create({
  backgroundSection: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    flex: 0.4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skyBackground: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
})
