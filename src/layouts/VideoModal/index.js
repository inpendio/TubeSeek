import React, {
  memo, useState, useRef, useEffect,
} from 'react';
import {
  LayoutAnimation,
  View,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import { useSelector } from 'react-redux';
import Interactable from 'react-native-interactable';
import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';
import useStyles from './useStyle';

function VideoModal() {
  const [isDraging, setIsDraging] = useState(false);
  const video = useSelector(s => s.video.currentVideo);
  const xy = useRef(new Animated.ValueXY());
  const stopPanning = false;

  const [styleState, setStyleState] = useState('full');
  const {
    reset,
    setFull,
    setDiminished,
    styles,
    isFull,
    height,
    DIMINISHED_HEIGHT,
  } = useStyles();
  // console.log(styles);
  /* if (!video) {
    if (styleState === 'diminished') setStyleState('full');
    return null;
  } */

  useEffect(() => {
    setStyleState('full');
  }, [video]);

  if (!video || !video.provider) return null;

  // console.log(factorY, xy.current.y + factorY, xy.current.y);
  // xy.current.y._value = xy.current.y._value + factorY;
  // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  return (
    <View
      style={[styles.wrapper, isDraging && { backgroundColor: 'transparent' }]}
    >
      <Interactable.View
        style={[styles.interactable]}
        alertAreas={[
          { id: 'toTop', influenceArea: { bottom: -100 } },
          { id: 'toBottom', influenceArea: { top: 100 } },
        ]}
        onAlert={({ nativeEvent: { toTop, toBottom } }) => {
          if (toBottom === 'enter') setDiminished();
          if (toTop === 'enter') setFull();
        }}
        snapPoints={[{ x: 0 }, { x: 0 }]}
        onDrag={({ nativeEvent: { state } }) => {
          if (state === 'start') setIsDraging(true);
          else if (state === 'end') setIsDraging(false);
        }}
      >
        <Video
          videoLink={video.source}
          thumbnailLink={video.thumbnail}
          style={styles.video}
        />
      </Interactable.View>
      {!isDraging && !isFull && <OutsideControls style={styles.controls} />}
      {/* </Interactable.View> */}
      {!isDraging && isFull && (
        <VideoMeta style={styles.meta} isFull={isFull} />
      )}
    </View>
  );
}

export default memo(VideoModal);
