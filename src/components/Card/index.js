import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

function Card({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.wrapper, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

export default memo(Card);
