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
module.exports = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  header: {
    height: 46,
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
  },
  mainWindow: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomBar: {
    height: 36,
    backgroundColor: colors.darkgrey,
  },

  padFullHorizontal: {
    paddingLeft: 18,
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

  textLogo: {
    fontSize: 14,
    color: colors.darkgrey,
  },
  textTagline: {
    fontSize: 10,
    fontFamily: 'Lobster',
    color: colors.darkgrey,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -5,
  },

  inputContainer: {
    paddingTop: 5,
    paddingRight: 22,
    paddingLeft: 14,
  },
  input: {
    backgroundColor: colors.white,
    flex: 1,
    fontSize: 12,
    height: 26,
    fontFamily: 'Poppins',
    paddingTop: 1.5,
    paddingLeft: 8,
    borderRadius: 3,
  },
  inputButton: {
    color: colors.white,
    paddingLeft: 22,
    fontSize: 12,
  },

  photoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: colors.lightgrey,
  },

  bgBreakingSection: {
    backgroundColor: colors.offwhite,
  },
});

module.exports.colors = colors;
