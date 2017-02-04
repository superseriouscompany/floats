import React from 'react'
import Text from './Text'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'

export default function(props) { return (
  <View style={styles.container}>
    <Text onPress={() => props.navigator.navigate('NotificationPermissionScene')}>
      Background Permissions
    </Text>
  </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
