'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import branch from 'react-native-branch';
import {connect} from 'react-redux'
import {
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

class InviteButton extends Component {
  constructor(props) {
    super(props)
    this.invitationDialog = this.invitationDialog.bind(this)
    this.state = {}
  }

  render() { return (
    <TouchableOpacity style={[styles.box, base.padFullHorizontal, base.padMainItem]} onPress={this.invitationDialog}>
      <Image style={[base.photoCircle]} source={require('../images/MissingProfileCircle.png')} />
      <Text style={[styles.main, {marginRight: 10}]}>Missing Someone?</Text>
    </TouchableOpacity>
  )}

  invitationDialog() {
    if( !this.props.user || !this.props.user.id ) {
      console.warn("No user set", JSON.stringify(this.props));
    }
    if( this.state.sharing ) { return;}
    this.setState({sharing: true})

    let branchUniversalObject = branch.createBranchUniversalObject(
      `friends/invite/${this.props.user.id}`,
      {
        metadata: {
          inviter_id: this.props.user.id,
        }
      }
    )

    let linkProperties = {
      feature: 'friend-invitation',
      channel: 'app'
    }

    let controlParams = {
      '$ios_deepview': 'floats_deepview_vk8d',
    }

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
      console.warn('sharing url', payload.url, JSON.stringify(payload))
      Share.share({
        message: Platform.OS == 'android' ? `Download Floats ${payload.url}` : 'Download Floats',
        url: payload.url,
      }, {
        dialogTitle: 'Invite Friends',
        tintColor: 'blue'
      })
    }).then(() => {
      this.setState({sharing: false})
    }).catch((error) => {
      this.setState({sharing: false})
      console.error(error)
      alert(error);
    })
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(InviteButton)

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
})
