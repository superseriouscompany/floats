'use strict';

import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';

function reducer(state = {}, action) {
  switch(action.type) {
    case 'items:load':
      return {
        ...state,
        loading: true,
        error: null,
        items: []
      }
    case 'items:load:yes':
      return {
        ...state,
        loading: false,
        items: action.items,
      }
    case 'items:load:no':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default class Scratch extends Component {
  render() { return (
    <Provider store={store}>
      <Poop />
    </Provider>
  )}
}

class ScratchDumb extends Component {
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

    this.props.dispatch({type: 'items:load'});
    setTimeout( ()=> {
      if( Math.random() > 0.5 ) {
        this.props.dispatch({type: 'items:load:yes', items: items });
      } else {
        this.props.dispatch({type: 'items:load:no', error: new Error('Something went wrong') });
      }
    }, 500);
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
      <TouchableOpacity onPress={this.reload.bind(this)}>
        <Text>Reload</Text>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        { this.props.loading ?
          <Text>Loading...</Text>
        : null }

        { this.props.error ?
          <Text style={{color: 'indianred'}}>{this.state.error}</Text>
        : this.props.items ?
          <View>
            {this.props.items.map( (x, key) => (
              <Text key={key}>{x}</Text>
            ))}
          </View>
        : null
        }

        <Text>{ this.props.cool }</Text>
      </View>
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    items:   state.items,
    error:   state.error,
    loading: state.loading,
  }
}

const Poop = connect(mapStateToProps)(ScratchDumb)
