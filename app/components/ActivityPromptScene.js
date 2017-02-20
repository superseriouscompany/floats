'use strict';

import Heading from '../components/Heading';
import TabBar from '../components/TabBar';
import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ActivityPromptScene extends Component {
  constructor(props) {
    super(props)
    this.state = { text: ''}
  }

  render() { return (
    <View style={base.screen}>
      <View style={base.header}>
        <Heading>what's up wit it</Heading>
      </View>

      <View style={base.mainWindow}>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="halp" placeholderTextColor={base.colors.mediumgrey} underlineColorAndroid={'transparent'} onChangeText={(text) => this.setState({text})}/>
          <TouchableOpacity onPress={this.doShit.bind(this)}>
            <Text>Do it</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabBar active="createFloat" navigator={this.props.navigator}/>
    </View>
  )}

  doShit() {
    alert(this.state.text)
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
  }
})
