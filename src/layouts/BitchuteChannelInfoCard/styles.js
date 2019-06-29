import { StyleSheet } from 'react-native';
import { colors } from 'config';

export default StyleSheet.create({
  wrapper: {
    marginTop: 50,
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderColor: colors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    backgroundColor: `${colors.secondary}11`,
    flexDirection: 'row',
    // transform: [{ translateY: -20 }],
    // justifyContent: 'flex-end',
    // zIndex: -2,
    padding: 10,
  },
  badge: {
    /* position: 'absolute',
    top: 20,
    left: 0, */
  },
  textBlock: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
