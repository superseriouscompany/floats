'use strict';

import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Goals:
//
// * trigger api call from arbitrary notification handler
import {createStore, applyMiddleware} from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

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

const middleware = [thunk];
if( __DEV__ ) {
  middleware.push(createLogger());
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

const party = (dispatch, getState) => {
  setTimeout(function() {
    dispatch({type: 'items:load:no', error: new Error('nope')});
  }, 1000);
}

class Scratch extends Component {
  render() { return (
    <Provider store={store}>
      <Foo />
    </Provider>
  )}
}

export default Scratch;

class Foo extends Component {
  constructor(props) {
    super(props);

    setTimeout(receiveNotification, 1000);
    this.load();
  }

  load() {
    const count = Math.floor(Math.random() * 10);
    let items = [];
    for( var i = 0; i < count; i++ ) {
      items.push(`Thing ${Math.floor(Math.random() * 100)}`)
    }

    this.props.dispatch({type: 'items:load'});
    setTimeout( ()=> {
      if( Math.random() > 0 ) {
        this.props.dispatch({type: 'items:load:yes', items: items });
      } else {
        this.props.dispatch({type: 'items:load:no', error: new Error('Something went wrong') });
      }
    }, 500);
  }

  render() { return (
    <FooView {...this.props} load={this.load.bind(this)} />
  )}
}

Foo = connect(mapStateToProps)(Foo);

function mapStateToProps(state) {
  return {
    items:   state.items,
    error:   state.error,
    loading: state.loading,
  }
}

class FooView extends Component {
  constructor(props) {
    super(props)
  }

  render() { return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
      <ReloadButton load={this.props.load}/>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        { this.props.loading ?
          <Text>Loading...</Text>
        : null }

        { this.props.error ?
          <Text style={{color: 'indianred'}}>{this.props.error.toString()}</Text>
        : this.props.items ?
          <View>
            {this.props.items.map( (x, key) => (
              <Text key={key}>{x}</Text>
            ))}
          </View>
        : null
        }
      </View>
    </View>
  )}
}

FooView.propTypes = {
  load: React.PropTypes.func.isRequired,
}

class ReloadButton extends Component {
  render() { return (
    <TouchableOpacity onPress={this.props.load}>
      <Text>Reload</Text>
    </TouchableOpacity>
  )}
}

FooView.propTypes = {
  load: React.PropTypes.func.isRequired,
}

function receiveNotification() {
  // TODO: append intelligently
  store.dispatch(party);
}