import { Dimensions, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { addOrientationData } from 'store';

export const ORIENTATION = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

export default function orientation({ dispatch }) {
  const getOrientation = (w, h) => (w < h ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE);
  const onChange = (p) => {
    const all = Dimensions.get('window');
    const { width, height } = all;
    dispatch(
      addOrientationData({
        orientation: getOrientation(width, height),
        width,
        height,
        statusBar: DeviceInfo.hasNotch() ? StatusBar.currentHeight : 0,
      }),
    );
  };
  Dimensions.addEventListener('change', onChange);
  onChange();
}
