import { StyleSheet } from 'react-native';
import { colors } from 'config';

export default StyleSheet.create({
  wrapper: {
    borderBottomColor: colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  icon: {
    padding: 5,
  },
  childrenWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
