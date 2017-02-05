'use strict';

import React from 'react';
import Component from './Component';
import Text from './Text';
import base from '../styles/base';
import branch from 'react-native-branch';
import {connect} from 'react-redux'
import {
  ActionSheetIOS,
  Image,
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
    <View style={[styles.box, base.padFullHorizontal, base.padMainItem]}>
      <Image style={[base.photoCircle]} source={require('../images/MissingProfileCircle.png')} />
      <TouchableOpacity onPress={this.invitationDialog}>
        <Text style={[styles.main, {marginRight: 10}]}>Missing Someone?</Text>
      </TouchableOpacity>
    </View>
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
      '$og_title': 'Cash me ousside',
      '$og_description': 'How bow dah',
      '$og_image_url': 'https://pixel.nymag.com/imgs/daily/selectall/2017/02/02/02-catch-me-outside.w710.h473.2x.jpg',
    }

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((thing) => {
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: thing.url,
        message: 'Download Floats',
      }, (error) => {
        console.error(error);
        alert(error.message);
      }, (success, method) => {
      })
      this.setState({sharing: false})
    }).catch((err) => {
      this.setState({sharing: false})
      console.error(err);
      alert(err.message);
    });
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
  }
})
