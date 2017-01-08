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
    height: 40,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNav: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'hotpink',
  },
  mainWindow: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomBar: {
    height: 50,
    backgroundColor: colors.darkgrey,
  },

  padded: {
    padding: 10,
  },

  textLogo: {
    fontSize: 20,
    fontFamily: 'Lobster',
  },
  textTagline: {
    fontSize: 10,
    fontStyle: 'italic',
  },

  bgBreakingSection: {
    backgroundColor: colors.offwhite,
  },
});

module.exports.colors = colors;
