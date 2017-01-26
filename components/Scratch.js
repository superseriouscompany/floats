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

    this.state = { items: []};
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const count = Math.floor(Math.random() * 10);
    let items = [];
    for( var i = 0; i < count; i++ ) {
      items.push(`Thing ${Math.floor(Math.random() * 100)}`)
    }

    this.setState({
      loading: true,
      error: null,
      items: [],
    })

    setTimeout( ()=> {
      if( Math.random() > 0.5 ) {
        this.setState({
          items: items,
          error: null,
          loading: false,
        })
      } else {
        this.setState({
          error: 'Something went wrong...',
          loading: false,
        })
      }
    }, 500);
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
      <TouchableOpacity onPress={this.reload.bind(this)}>
        <Text>Reload</Text>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        { this.state.loading ?
          <Text>Loading...</Text>
        : null }

        { this.state.error ?
          <Text style={{color: 'indianred'}}>{this.state.error}</Text>
        :
          <View>
            {this.state.items.map( (x, key) => (
              <Text key={key}>{x}</Text>
            ))}
          </View>
        }
      </View>
    </View>
  )}
}

Scratch.contextTypes =  {
  store: React.PropTypes.object
}
