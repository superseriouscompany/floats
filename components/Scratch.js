'use strict';

import React, {Component} from 'react';
import FCM from 'react-native-fcm';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Scratch extends Component {
  constructor(props) {
    super(props)

    this.state = { things: []};
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const count = Math.floor(Math.random() * 10);
    let things = [];
    for( var i = 0; i < count; i++ ) {
      things.push(`Thing ${Math.floor(Math.random() * 100)}`)
    }
    this.setState({
      things: things,
    })
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
      <TouchableOpacity onPress={this.reload.bind(this)}>
        <Text>Reload</Text>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {this.state.things.map( (x, key) => (
          <Text key={key}>{x}</Text>
        ))}
      </View>
    </View>
  )}
}

Scratch.contextTypes =  {
  store: React.PropTypes.object
}
