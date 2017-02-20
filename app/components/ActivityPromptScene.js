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
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="halp" placeholderTextColor={base.colors.mediumgrey} underlineColorAndroid={'transparent'} onChangeText={(text) => this.setState({text})}/>
          </View>
          <TouchableOpacity onPress={this.setActivity.bind(this)}>
            <Text style={styles.button}>Do it</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabBar active="createFloat" navigator={this.props.navigator}/>
    </View>
  )}

  setActivity() {
    if( !this.state.text ) { return; }
    this.props.setActivity(this.state.text);
  }
}

ActivityPromptScene.propTypes = {
  setActivity: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: 'lawngreen',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: base.colors.darkgrey,
    height: 32,
    paddingTop: 1.25,
    paddingLeft: 4,
    textAlign: 'center',
  },
  button: {
    shadowColor: 'hotpink',
    shadowRadius: 10,
    shadowOpacity: 0.89,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 100,
    backgroundColor: 'cornflowerblue',
    color: 'white',
    width: 50,
    textAlign: 'center',
  }
})
