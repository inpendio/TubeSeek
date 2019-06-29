import React, { memo } from 'react';
import { Text as RNText } from 'react-native';
import {
  sizeMap,
  colorMap,
  sizes,
  colors,
  styles,
  decoratorMap,
  decorators,
} from './style';

function Text(props) {
  const {
    children, style, onPress, ...other
  } = props;
  const combineStyles = [styles.base];
  sizeMap.forEach((s) => {
    if (props[s]) combineStyles.push(sizes[s]);
  });
  colorMap.forEach((s) => {
    if (props[s]) combineStyles.push(colors[s]);
  });
  decoratorMap.forEach((s) => {
    if (props[s]) combineStyles.push(decorators[s]);
  });
  if (style) combineStyles.push(style);
  return (
    <RNText style={combineStyles} onPress={onPress} {...other}>
      {children}
    </RNText>
  );
}

export default memo(Text);
