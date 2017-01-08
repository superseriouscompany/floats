import {
  StyleSheet,
} from 'react-native'

const colors = {
  poop: 'cornflowerblue',
  foo: 'hotpink',
}
module.exports = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingTop: 20,
  },
  header: {
    height: 40,
    backgroundColor: 'slateblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNav: {
    position: 'absolute',
    left: 0,
    top: 7,
    backgroundColor: 'hotpink',
  },
  rightNav: {
    position: 'absolute',
    right: 0,
    top: 7,
    backgroundColor: 'hotpink',
  },
  mainWindow: {
    flex: 1,
    backgroundColor: colors.poop,
  },
  bottomBar: {
    height: 50,
    backgroundColor: 'navy',
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
});

module.exports.colors = colors;
