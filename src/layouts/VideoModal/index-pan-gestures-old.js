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
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import Interactable from 'react-native-interactable';
import { actionVideoSetIsFull } from 'store';
import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';
import useStyles from './useStyle-old';

console.log(State);

function VideoModal() {
  const [isDraging, setIsDraging] = useState(false);
  const video = useSelector(s => s.video.currentVideo);
  const _isFull = useSelector(s => s.video.isFull);
  const dispatch = useDispatch();
  // const xy = useRef(new Animated.ValueXY());
  // const stopPanning = false;
  // const _translateX = useRef(new Animated.Value(0));
  const _translateY = useRef(new Animated.Value(0));
  const _lastOffset = useRef({ x: 0, y: 0 });

  // const [styleState, setStyleState] = useState('full');
  const {
    reset,
    setFull,
    setDiminished,
    styles,
    isFull,
    height,
    width,
    setDiminishedVideoStyle,
    setFullVideoStyle,
    DIMINISHED_HEIGHT,
  } = useStyles();
  // console.log(styles);
  /* if (!video) {
    if (styleState === 'diminished') setStyleState('full');
    return null;
  } */

  const animateToStart = () => {
    Animated.timing(_translateY.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0,
    }).start();
  };

  useEffect(() => {
    animateToStart();
  }, [styles]);

  useEffect(() => {
    if (_isFull) {
      setFull();
    } else {
      setDiminished();
    }
  }, [_isFull]);

  if (!video || !video.provider) return null;

  // console.log(factorY, xy.current.y + factorY, xy.current.y);
  // xy.current.y._value = xy.current.y._value + factorY;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  // console.log(_translateX, _translateY, _lastOffset);
  console.groupCollapsed('VideoModal states');
  console.log(styles);
  console.log('isFull', isFull);
  console.log('isDragging', isDraging);
  console.log('offset', _lastOffset.current);
  console.log('AnimatedValue', _translateY.current._value);
  console.groupEnd();
  return (
    <Animated.View
      style={[
        styles.wrapper,
        isDraging && { backgroundColor: '#2368d233', zIndex: 9999 },
        {
          transform: [{ translateY: _translateY.current }],
        },
      ]}
    >
      <PanGestureHandler
        activeOffsetY={[-10, 10]}
        failOffsetY={300}
        onGestureEvent={Animated.event(
          [
            {
              nativeEvent: {
                // translationX: _translateX.current,
                translationY: _translateY.current,
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: (event) => {
              const {
                nativeEvent: { translationY },
              } = event;
              // console.log(translationY, event.nativeEvent);
              if (isFull) {
                if (translationY > 100 && styles.video.width === width) setDiminishedVideoStyle();
                else if (translationY < 100 && styles.video.width !== width) setFullVideoStyle();
              } else if (!isFull) {
                if (translationY < -100 && styles.video.width !== width) setFullVideoStyle();
                else if (translationY > -100 && styles.video.width === width) setDiminishedVideoStyle();
              }
            },
          },
        )}
        onHandlerStateChange={(event) => {
          console.log(event.nativeEvent);
          const {
            nativeEvent: { oldState, translationY, state },
          } = event;
          switch (state) {
            case State.ACTIVE:
              console.log('ACTIVE');
              /* if (isFull) */ _translateY.current.setOffset(
                _lastOffset.current.y,
              );
              if (!isDraging) setIsDraging(true);
              break;
            case State.END: {
              let __isFull = true;
              console.log('END END END END', translationY);
              if (translationY > 100) __isFull = false;
              else if (translationY < -100) __isFull = true;
              _lastOffset.current.y = __isFull ? 0 : height - DIMINISHED_HEIGHT;
              // _translateY.current.setOffset(_lastOffset.current.y);
              if (__isFull) {
                _translateY.current.setOffset(0);
                // dispatch(actionVideoSetIsFull(true));

                // setTimeout(animateToStart, 0);
                // Animated.timing(_translateY.current, {
                //   toValue: 0,
                //   useNativeDriver: true,
                //   duration: 0,
                // }).start();
              } else {
                // dispatch(actionVideoSetIsFull(false));
                // setTimeout(animateToStart, 0);
                // Animated.timing(_translateY.current, {
                //   toValue: 0,
                //   useNativeDriver: true,
                //   duration: 0,
                // }).start();
              }
              setIsDraging(false);
              break;
            }
            case State.BEGAN:
              console.log('BEGAN');
              // _lastOffset.current.y = isFull ? 0 : height - DIMINISHED_HEIGHT;
              break;
            default:
              break;
          }
          /* if (event.nativeEvent.oldState === State.ACTIVE) {
            // _lastOffset.x += event.nativeEvent.translationX;
            _lastOffset.current.y += event.nativeEvent.translationY;
            // _translateX.setOffset(_lastOffset.x);
            // _translateX.setValue(0);
            _translateY.current.setOffset(_lastOffset.current.y);
            _translateY.current.setValue(0);
          } */
        }}
      >
        <Animated.View
          key="video_wrapper"
          style={
            [
              // {
              //   transform: [{ translateY: _translateY.current }],
              // },
              // isDraging && { position: 'absolute', zIndex: 99999 },
            ]
          }
        >
          <Video
            videoLink={video.source}
            thumbnailLink={video.thumbnail}
            style={styles.video}
          />
        </Animated.View>
        {/* <Video
          videoLink={video.source}
          thumbnailLink={video.thumbnail}
          style={styles.video}
        /> */}
      </PanGestureHandler>
      {!isDraging && !isFull && <OutsideControls style={styles.controls} />}
      {/* </Interactable.View> */}
      {!isDraging && isFull && (
        <Animated.View
          style={[
            {
              opacity: _translateY.current.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <VideoMeta style={styles.meta} isFull={isFull} />
        </Animated.View>
      )}
    </Animated.View>
  );
}

export default memo(VideoModal);
