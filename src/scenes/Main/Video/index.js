import React, { memo } from 'react';
import { Scene } from 'react-native-magic-move';
import { BitchuteVideoView } from 'layouts';

function VideoScene({ navigation }) {
  const {
    state: {
      params: { imageUrl },
    },
  } = navigation;
  return (
    <Scene>
      <BitchuteVideoView thumbnail={imageUrl} navigation={navigation} />
    </Scene>
  );
}
export default memo(VideoScene);
