import React, { memo } from 'react';
import { Button as RNEButton } from 'react-native-elements';

import { colorMap, clearStyles, solidStyles } from './styles';

function Button(props) {
  const extraProps = {};
  colorMap.forEach((c) => {
    if (props[c]) {
      switch (props.type) {
        case 'outline':
        case 'clear':
          extraProps.titleStyle = clearStyles[c];
          break;
        case 'solid':
        default:
          extraProps.buttonStyle = solidStyles[c];
          break;
      }
    }
  });
  if (!extraProps.titleStyle || !extraProps.buttonStyle) {
    switch (props.type) {
      case 'outline':
      case 'clear':
        extraProps.titleStyle = clearStyles.primary;
        break;
      case 'solid':
      default:
        extraProps.buttonStyle = solidStyles.primary;
        break;
    }
  }
  return <RNEButton {...props} {...extraProps} />;
}

export default memo(Button);
