import {
  StyleSheet,
} from 'react-native'

const colors = {
  white: '#FFFFFF',
  offwhite: '#FEFDFF',
  lightgrey: '#EFEEF0',
  mediumgrey: '#898989',
  darkgrey: '#443B3B',
  color1: '#E88868',
  color2: '#34B7B5',
}
const fontSizes = {
  small: 12,
}
module.exports = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
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
  header: {
    height: 45,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightgrey,
  },
  leftNav: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  rightNav: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  mainWindow: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomBar: {
    height: 42.1,
    backgroundColor: colors.darkgrey,
    borderTopWidth: 0.5,
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
    paddingTop: 19,
    paddingBottom: 17,
  },
  padShort: {

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
    fontFamily: 'Lobster',
    color: colors.darkgrey,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -6,
  },
  textHeader: {
    marginTop: -2,
  },
  inputContainer: {
    paddingTop: 5,
    paddingRight: 22,
    paddingLeft: 5,
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
    borderWidth: 0.5,
    borderColor: colors.lightgrey,
  },
  miniPhotoCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },

  bgBreakingSection: {
    backgroundColor: colors.offwhite,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightgrey,
  },
});

module.exports.colors = colors;
module.exports.fontSizes = fontSizes;
