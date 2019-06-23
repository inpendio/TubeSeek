import { StyleSheet } from 'react-native';

export const buttonStyle = StyleSheet.create({
  wrapper: { flex: 1 },
  img: {
    width: 35,
    height: 35,
  },
});
export const blockStyle = StyleSheet.create({
  wrapperAll: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    marginTop: 10,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    maxWidth: '100%',
  },
  button: {
    flex: 1,
  },
});
