import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  hidden: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: -110,
    left: -110,
    zIndex: -9999,
  },
});
