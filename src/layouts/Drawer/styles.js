import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  buttonImage: {
    height: 25,
    maxWidth: 100,
  },
  logo: {
    marginTop: 20,
    width: 260,
    maxHeight: 60,
    // height: 25,
  },
  tubeButton: {
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    borderColor: '#777',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
