import React, { memo, useState, useRef } from 'react';
import {
  LayoutAnimation, View, PanResponder, Animated,
} from 'react-native';

import { useSelector } from 'react-redux';
import Interactable from 'react-native-interactable';
import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';
import useStyles from './useStyle';

function VideoModal() {
  const video = useSelector(s => s.video.currentVideo);
  const xy = useRef(new Animated.ValueXY());
  let stopPanning = false;

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
  if (!video) {
    if (styleState === 'diminished') setStyleState('full');
    return null;
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      if (stopPanning) return false;
      stopPanning = false;
      return true;
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      const factorY = isFull ? 0 : height - DIMINISHED_HEIGHT;
      if (factorY) xy.current.setOffset({ y: height - DIMINISHED_HEIGHT, x: 0 });

      // this here is when user starts the panning.
      // currently no use, but we could dim view, for instace, while dragging
      // console.log('START::', JSON.parse(JSON.stringify(gestureState)));
    },
    onPanResponderMove: (e, gesture) => {
      // console.log('ON::', JSON.parse(JSON.stringify(gesture)));
      Animated.event([
        null,
        {
          dx: xy.current.x, // x,y are Animated.Value
          dy: xy.current.y,
        },
      ])(e, gesture);
    },
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy > 100) {
        Animated.timing(
          xy.current, // Auto-multiplexed
          {
            toValue: { x: 0, y: height - DIMINISHED_HEIGHT },
            duration: 300,
          }, // Back to zero
        ).start();
        stopPanning = true;
        setDiminished();
      } else if (gesture.dy < -100) {
        xy.current.setOffset({ y: 0, x: 0 });
        Animated.timing(
          xy.current, // Auto-multiplexed
          {
            toValue: { x: 0, y: 0 }, // Back to zero
            duration: 300,
          },
        ).start();
        stopPanning = true;
        setFull();
      }
    },
  });
  console.log(panResponder, panResponder.panResponderEnabled);

  if (!video.provider) return null;

  // console.log(factorY, xy.current.y + factorY, xy.current.y);
  // xy.current.y._value = xy.current.y._value + factorY;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ translateY: xy.current.y }] }]}
      {...panResponder.panHandlers}
    >
      {/* <Interactable.View
        key={video.videoLink}
        style={styles.interactable}
        onPress={() => {
          console.log('Interactable onPress');
        }}
        snapPoints={[{ y: 0, id: 'up' }, { y: 300, id: 'down' }]}
        onSnap={({ nativeEvent }) => {
          if (nativeEvent.id === 'down') setDiminished();
          if (nativeEvent.id === 'up') setFull();
        }}
      > */}

      <Video
        videoLink={video.source}
        thumbnailLink={video.thumbnail}
        style={styles.video}
      />
      {!isFull && <OutsideControls style={styles.controls} />}
      {/* </Interactable.View> */}
      {isFull && <VideoMeta style={styles.meta} />}
    </Animated.View>
  );
}

export default memo(VideoModal);
