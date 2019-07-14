import React, { memo } from 'react';
import { View as RNView, Image } from 'react-native';
import Video from 'react-native-video';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'components';
import { actionBitchuteRemoveToQueue, actionVideoPlayNext } from 'store';

function VideoBox({ videoLink, thumbnailLink, style }) {
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const dispatch = useDispatch();
  if (videoLink) {
    return (
      <Video
        source={{ uri: videoLink }}
        style={[style]}
        fullscreen={orientation === 'landscape'}
        controls
        onReadyForDisplay={() => {
          dispatch(actionBitchuteRemoveToQueue({ videoLink }));
        }}
        onEnd={() => {
          dispatch(actionVideoPlayNext());
        }}
        // playInBackground
        // playWhenInactive
      />
    );
  }
  return (
    <RNView style={[style]}>
      <Image
        source={{ uri: thumbnailLink }}
        style={[style]}
        resizeMode="contain"
      />
      <Loader
        style={[
          {
            width: '100%',
            position: 'absolute',
            top: 0,
            backgroundColor: 'transparent',
          },
          style,
        ]}
        size="large"
      />
    </RNView>
  );
}

export default memo(VideoBox);
