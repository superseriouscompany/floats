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

      <View style={base.mainWindow}>
        <View style={styles.container}>
          <Text style={{textAlign: 'center', paddingBottom: 20}}>
            What&#39;s an activity you enjoy doing with friends?
          </Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="" placeholderTextColor={base.colors.mediumgrey} underlineColorAndroid={'transparent'} onChangeText={(text) => this.setState({text})}/>
          </View>
          <TouchableOpacity style={[styles.emptyButtons, {backgroundColor: base.colors.color2}]} onPress={this.setActivity.bind(this)}>
            <Text style={styles.emptyButtonText}>
              find friends
            </Text>
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputContainer: {
    backgroundColor: base.colors.white,
    borderBottomWidth: 1,
    borderColor: '#BEBEBE',
    width: 200,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: base.colors.darkgrey,
    height: 32,
    paddingTop: 1.25,
    paddingLeft: 4,
    textAlign: 'center'
  },
  emptyButtons: {
    width: 200,
    height: 50,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButtonText: {
    color: 'white',
    textAlign: 'center'
  },
})
