import React, { memo, useState } from 'react';
import { LayoutAnimation } from 'react-native';

import { useSelector } from 'react-redux';
import Interactable from 'react-native-interactable';

import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';

const DH = 145;

function VideoModal() {
  const video = useSelector(s => s.video.currentVideo);
  const height = useSelector(s => s.general.dimensions.height);
  const width = useSelector(s => s.general.dimensions.width);
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const [styleState, setStyleState] = useState('full');
  if (!video) {
    if (styleState === 'diminished') setStyleState('full');
    return null;
  }
  const FULLSCREEN_PORTRAIT = {
    WRAPPER: {
      /* ...StyleSheet.absoluteFill, */
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      paddingBottom: 20,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    HEIGHT: { height: width * 0.5625, width },
    STYLE_VIDEO: { flex: 0 },
    STYLE_META: {},
    OUTSIDE_CONTROLS: {
      position: 'absolute',
      height: 0,
      width: 0,
    },
  };
  const DIMINISHED_PORTRAIT = {
    WRAPPER: {
      top: height - 300 - DH,
      height: DH,
      flexDirection: 'row',
      // backgroundColor: 'yellow',
      width,
    },
    HEIGHT: { height: DH, width: 260 },
    STYLE_VIDEO: { flex: 1 },
    STYLE_META: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      position: 'absolute',
      height: 0,
    },
    OUTSIDE_CONTROLS: {
      flex: 1,
      width: '100%',
    },
  };
  const FULLSCREEN_LANDSCAPE = {
    WRAPPER: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    HEIGHT: { height },
    STYLE_VIDEO: { top: 0, bottom: 0 },
    STYLE_META: { height: 0 },
  };

  const styleMap = {
    full_portrait: FULLSCREEN_PORTRAIT,
    diminished_portrait: DIMINISHED_PORTRAIT,
    full_landscape: FULLSCREEN_LANDSCAPE,
    diminished_landscape: FULLSCREEN_LANDSCAPE,
  };

  const transformToBottom = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStyleState('diminished');
  };
  const transformToTop = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setStyleState('full');
  };
  if (!video.provider) return null;
  return (
    <Interactable.View
      key={video.videoLink}
      style={[
        {
          position: 'absolute',
          zIndex: 9999,
        },
        styleMap[`${styleState}_${orientation}`].WRAPPER,
      ]}
      snapPoints={[{ y: 0, id: 'up' }, { y: 300, id: 'down' }]}
      onSnap={({ nativeEvent }) => {
        console.log(nativeEvent);
        if (nativeEvent.id === 'down') transformToBottom();
        if (nativeEvent.id === 'up') transformToTop();
      }}
    >
      <Video
        videoLink={video.source}
        thumbnailLink={video.thumbnail}
        style={styleMap[`${styleState}_${orientation}`].HEIGHT}
      />
      <VideoMeta style={styleMap[`${styleState}_${orientation}`].STYLE_META} />
      <OutsideControls
        style={styleMap[`${styleState}_${orientation}`].OUTSIDE_CONTROLS}
      />
    </Interactable.View>
  );
}

export default memo(VideoModal);
