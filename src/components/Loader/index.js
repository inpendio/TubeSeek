import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Loader({ size = 'large', color = 'blue', style = {} }) {
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
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default Loader;
