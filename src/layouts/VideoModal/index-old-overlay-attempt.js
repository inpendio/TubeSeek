import React, { memo, useState } from 'react';
import { LayoutAnimation, View } from 'react-native';

import { useSelector } from 'react-redux';
import Interactable from 'react-native-interactable';

import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';
import Controls from './Controls';

const DH = 145;

function VideoModal() {
  const video = useSelector(s => s.video.currentVideo);
  const height = useSelector(s => s.general.dimensions.height);
  const width = useSelector(s => s.general.dimensions.width);
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const isBackground = useSelector(s => s.general.isInBackground);
  const [controlls, setControlls] = useState('#00000077');
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
    INNER_WRAPPER: {
      width,
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
    DRAGGER: {
      width,
      height: width * 0.5625,
      //   position: 'absolute',
      //   top: 0,
    },
  };
  const DIMINISHED_PORTRAIT = {
    WRAPPER: {
      top: height - DH,
      height: DH,

      // backgroundColor: 'yellow',
      width,
    },
    INNER_WRAPPER: {
      flexDirection: 'row',
      flex: 1,
    },
    DRAGGER: {
      height: width * 0.5625,
      width: DH / 0.5625,
    },
    HEIGHT: { height: DH, width: DH / 0.5625 },
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
  const transform = () => {
    if (styleState === 'full') transformToBottom();
    else transformToTop();
  };
  if (!video.provider) return null;
  return (
    <View
      key={video.videoLink}
      style={[
        {
          position: 'absolute',
          zIndex: 9999,
        },
        styleMap[`${styleState}_${orientation}`].WRAPPER,
      ]}
    >
      <View style={[styleMap[`${styleState}_${orientation}`].INNER_WRAPPER]}>
        <Interactable.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              backgroundColor: controlls,
            },
            styleMap[`${styleState}_${orientation}`].DRAGGER,
          ]}
          alertAreas={[
            { id: 'toTop', influenceArea: { bottom: -100 } },
            { id: 'toBottom', influenceArea: { top: 100 } },
          ]}
          onAlert={({ nativeEvent: { toTop, toBottom } }) => {
            if (toBottom === 'enter') transformToBottom();
            if (toTop === 'enter') transformToTop();
          }}
          onDrag={({ nativeEvent: { state: _state } }) => {
            console.log({
              _state,
            });
            if (_state === 'start') setControlls('#ffffff77');
            else if (_state === 'end') setControlls('#00000077');
          }}
          snapPoints={[{ x: 0 }, { x: 0 }]}
        >
          <Controls />

          <Video
            videoLink={video.source}
            thumbnailLink={video.thumbnail}
            style={styleMap[`${styleState}_${orientation}`].HEIGHT}
          />
          <VideoMeta
            style={styleMap[`${styleState}_${orientation}`].STYLE_META}
          />
          {styleState === 'diminished' && (
            <OutsideControls
              style={styleMap[`${styleState}_${orientation}`].OUTSIDE_CONTROLS}
            />
          )}
        </Interactable.View>
      </View>
    </View>
  );
}

export default memo(VideoModal);
