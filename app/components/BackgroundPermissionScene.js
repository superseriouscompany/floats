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
    <View style={styles.container}>
      <Text onPress={() => props.navigator.navigate('NotificationPermissionScene')}>
        Background Permissions
      </Text>
    </View>
  </Image>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
