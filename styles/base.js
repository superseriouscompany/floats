import {
  StyleSheet,
} from 'react-native'

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
  mainWindow: {
    flex: 1,
    backgroundColor: 'firebrick',
  },
  bottomBar: {
    height: 50,
    backgroundColor: 'navy',
  },

  textLogo: {
    fontSize: 20,
  },
  textTagline: {
    fontSize: 10,
    fontStyle: 'italic',
  },
});
