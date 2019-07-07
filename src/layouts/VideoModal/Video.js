import React, { memo } from 'react';
import { View as RNView, Image } from 'react-native';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import { Loader } from 'components';

function VideoBox({ videoLink, thumbnailLink, style }) {
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const width = useSelector(s => s.general.dimensions.width);
  if (false) {
    return (
      <Video
        source={{ uri: videoLink }}
        style={[{ width: '100%' }, style]}
        fullscreen={orientation === 'landscape'}
        controls
        playInBackground
        playWhenInactive
      />
    );
  }
  return (
    <RNView style={[{ flex: 1 }, style]}>
      <Image
        source={{ uri: thumbnailLink }}
        style={[{ width }, style]}
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
