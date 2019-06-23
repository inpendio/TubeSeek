import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from 'config';

function Loader({
  size = 'large',
  color = colors.secondary,
  style = {},
  ...other
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <ActivityIndicator size={size} color={color} {...other} />
    </View>
  );
}

export default memo(Loader);
