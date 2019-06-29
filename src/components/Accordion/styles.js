import { StyleSheet } from 'react-native';
import { colors } from 'config';

export default StyleSheet.create({
  wrapper: {
    borderBottomColor: colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    padding: 5,
  },
  childrenWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  closed: {
    height: 0,
    flex: 0,
  },
});
