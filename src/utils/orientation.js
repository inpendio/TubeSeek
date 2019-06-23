import { Dimensions } from 'react-native';
import { addOrientationData } from 'store';

export default function orientation({ dispatch }) {
  const getOrientation = (w, h) => (w < h ? 'portrait' : 'landscape');
  const onChange = (p) => {
    const all = Dimensions.get('window');
    const { width, height } = all;
    dispatch(
      addOrientationData({
        orientation: getOrientation(width, height),
        width,
        height,
      }),
    );
  };
  Dimensions.addEventListener('change', onChange);
  onChange();
}
