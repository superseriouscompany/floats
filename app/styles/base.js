import {
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native'

var statusBarHeight = 0;
if( Platform.OS === 'ios' ) {
  statusBarHeight = (StatusBar.currentHeight === undefined) ? 20 : StatusBar.currentHeight;
}

const colors = {
  white: '#FFFFFF',
  offwhite: '#FEFDFF',
  lightgrey: '#EFEEF0',
  mediumlightgrey: '#BFBFBF',
  mediumgrey: '#898989',
  darkgrey: '#443B3B',
  color1: '#E88868',
  color2: '#34B7B5',
  color3: '#92D8D7',
}
const fontSizes = {
  big: 20,
  normal: 16,
  small: 12,
}
module.exports = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: statusBarHeight,
  },
  loadingCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  loadingTop: {
    marginTop: 25,
  },
  buttonLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    transform: [{scale: 1.25}],
  },
  airplaneLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 27,
    transform: [{scale: 1.25}],
  },
  header: {
    height: 45,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgrey,
  },
  leftNav: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    bottom: 0,
    top: 0,
  },
  rightNav: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
  },
  mainWindow: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomBar: {
    height: 42.1,
    backgroundColor: colors.darkgrey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.lightgrey,
  },
  padFullHorizontal: {
    paddingLeft: 16,
    paddingRight: 18,
  },
  padMainItem: {
    paddingTop: 18,
  },
  padTall: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  timestamp: {
    fontSize: 12,
  },
  textLogo: {
    fontSize: 16,
    color: colors.darkgrey,
    marginTop: 1,
  },
  textTagline: {
    fontSize: 12,
    fontFamily: 'Oleo Script',
    color: colors.darkgrey,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -6,
  },
  textHeader: {
    marginTop: -2,
  },
  inputButton: {
    color: colors.white,
    paddingLeft: 22,
    fontSize: 16,
  },
  photoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightgrey,
  },
  miniPhotoCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightgrey,
  },
  bgBreakingSection: {
    backgroundColor: colors.offwhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgrey,
  },
});

module.exports.colors = colors;
module.exports.fontSizes = fontSizes;
