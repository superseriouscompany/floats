'use strict';

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatsScene from '../components/FloatsScene';
// import { fetchFloats } from '../actions/floats';
// import { fetchConvos } from '../actions/convos';

class FloatsCtrl extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch(fetchFloats);
    // this.props.dispatch(fetchConvos);
  }

  render() { return (
    <FloatsScene {...this.props}/>
  )}
}

function mapStateToProps(state) {
  const inbox = generateInbox(state.invitations, state.myFloats, state.convos);
  const isEmpty = inbox && !inbox.length && state.invitations.all && !state.invitations.all.length;

  return {
    invitations: state.invitations,
    myFloats:    state.myFloats,
    convos:      state.convos,
    inbox:       inbox,
    empty:       isEmpty,
  }
}

function generateInbox(invitations, myFloats, convos) {
  if( !invitations.all || !myFloats.all || !convos.all ) { return null; }

  let floats = {};

  invitations.all.forEach(function(i) {
    if( !i.attending ) { return; }
    floats[i.id] = {
      ...i,
      time: i.created_at,
    }
  });

  myFloats.all.forEach(function(f) {
    floats[f.id] = {
      ...f,
      time: f.created_at,
    }
  })

  convos.all.forEach(function(c) {
    if( !floats[c.float_id] ) { return console.warn("Missing float for convo", c.id, c.float_id); }
    floats[c.float_id].convos = floats[c.float_id].convos || [];
    floats[c.float_id].convos.push(c);
    if( c.message && c.message.created_at ) {
      floats[c.float_id].time = Math.max(floats[c.float_id].time, c.message.created_at);
    }
  })

  const inbox = _.values(floats).sort(function(a, b) {
    return a.time < b.time;
  })
  return inbox;
}

export default connect(mapStateToProps)(FloatsCtrl);
