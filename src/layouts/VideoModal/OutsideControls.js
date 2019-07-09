import React, { memo } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { actionCleanVideo } from 'store';

function OutsideControls({ style }) {
  const dispatch = useDispatch();
  const exitVideo = () => {
    dispatch(actionCleanVideo());
  };
  return (
    <View
      style={[
        {
          backgroundColor: '#ffffff77',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Icon
        name="clear"
        type="material"
        size={30}
        color="#fff"
        reverse
        reverseColor="#333"
        onPress={exitVideo}
      />
    </View>
  );
}

export default memo(OutsideControls);
