import React, {
  memo, useState, useRef, useEffect,
} from 'react';
import { LayoutAnimation, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { actionVideoSetIsFull } from 'store';
import Video from './Video';
import VideoMeta from './VideoMeta';
import OutsideControls from './OutsideControls';

const DIMINISHED_HEIGHT = 110;

function VideoModal() {
  const [isDraging, setIsDraging] = useState(false);
  const video = useSelector(s => s.video.currentVideo);
  const _isFull = useSelector(s => s.video.isFull);
  const dispatch = useDispatch();
  const h = useSelector(s => s.general.dimensions.height);
  const w = useSelector(s => s.general.dimensions.width);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [videoStyle, setVideoStyle] = useState({
    height: width * 0.5625,
    width,
  });
  const _translateY = useRef(new Animated.Value(0));
  const _lastOffset = useRef({ x: 0, y: 0 });

  const setVideoFullStyle = () => {
    setVideoStyle({
      height: width * 0.5625,
      width,
    });
  };
  const setVideoDiminshedStyle = () => {
    setVideoStyle({
      height: DIMINISHED_HEIGHT,
      width: DIMINISHED_HEIGHT / 0.5625,
    });
  };
  useEffect(() => {
    Animated.timing(_translateY.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 10,
    }).start();
  }, []);

  useEffect(() => {
    if (!isDraging && _isFull) {
      setVideoFullStyle();
      setIsDraging(false);
      Animated.timing(_translateY.current, {
        toValue: 0,
        useNativeDriver: true,
        duration: 10,
      }).start();
    }
  }, [_isFull]);

  useEffect(() => {
    if (_isFull) {
      setVideoFullStyle();
    } else setVideoDiminshedStyle();
  }, [width]);

  if (!video || !video.provider) return null;

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  if (__DEV__) {
    console.groupCollapsed('VideoModal states');
    console.log('_isFull', _isFull);
    console.log('isDragging', isDraging);
    console.log('offset', _lastOffset.current);
    console.log('other', {
      width,
      height,
      videoStyle,
      _lastOffset,
    });
    console.log('AnimatedValue', _translateY.current);
    console.groupEnd();
  }
  return (
    <Animated.View
      onLayout={({
        nativeEvent: {
          layout: { width: www, height: hhh },
        },
      }) => {
        setHeight(hhh);
        setWidth(www);
      }}
      style={[
        {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: _isFull ? 'white' : '#ffffff99',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          zIndex: 999,
          flexDirection: _isFull ? 'column' : 'row',
        },
        isDraging && { backgroundColor: '#ffffff44', zIndex: 9999 },
        {
          transform: [{ translateY: _translateY.current }],
        },
      ]}
    >
      <PanGestureHandler
        activeOffsetY={[-20, 20]}
        failOffsetY={300}
        onGestureEvent={Animated.event(
          [
            {
              nativeEvent: {
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
              if (_isFull) {
                if (
                  translationY > 100
                  && videoStyle.height !== DIMINISHED_HEIGHT
                ) setVideoDiminshedStyle();
                else if (
                  translationY < 100
                  && videoStyle.height === DIMINISHED_HEIGHT
                ) setVideoFullStyle();
              } else if (!_isFull) {
                if (
                  translationY > -100
                  && videoStyle.height !== DIMINISHED_HEIGHT
                ) setVideoDiminshedStyle();
                else if (
                  translationY < -100
                  && videoStyle.height === DIMINISHED_HEIGHT
                ) setVideoFullStyle();
              }
            },
          },
        )}
        onHandlerStateChange={(event) => {
          // console.log(event.nativeEvent);
          const {
            nativeEvent: { translationY, state },
          } = event;
          switch (state) {
            case State.BEGAN:
              // console.log('BEGUN');
              _lastOffset.current.y = _isFull ? 0 : height - DIMINISHED_HEIGHT;
              // _translateY.current.setOffset(_lastOffset.current.y);
              // setIsDraging(true);
              break;
            case State.ACTIVE:
              // console.log('ACTIVE');
              _translateY.current.setOffset(_lastOffset.current.y);
              if (!isDraging) setIsDraging(true);
              break;
            case State.END:
              // console.log('END');
              if (translationY > 100 && translationY > 0) {
                Animated.timing(_translateY.current, {
                  toValue: height - DIMINISHED_HEIGHT,
                  useNativeDriver: true,
                  duration: 150,
                }).start(() => {
                  _lastOffset.current.y = height;
                });
                dispatch(actionVideoSetIsFull(false));
              } else if (translationY < -100 && translationY < 0) {
                Animated.timing(_translateY.current, {
                  toValue: -height + DIMINISHED_HEIGHT,
                  useNativeDriver: true,
                  duration: 150,
                }).start(() => {
                  _lastOffset.current.y = 0;
                });
                dispatch(actionVideoSetIsFull(true));
              } else {
                _translateY.current.setOffset(_lastOffset.current.y);
                Animated.timing(_translateY.current, {
                  toValue: 0,
                  useNativeDriver: true,
                  duration: 150,
                }).start();
              }
              setIsDraging(false);
              break;
            default:
              break;
          }
        }}
      >
        <Animated.View
          key="video_wrapper"
          style={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          <Video
            error={video.error}
            videoLink={video.source}
            thumbnailLink={video.thumbnail}
            style={[{ zIndex: 999 }, videoStyle]}
          />
        </Animated.View>
      </PanGestureHandler>
      {!isDraging && !_isFull && (
        <OutsideControls
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: DIMINISHED_HEIGHT,
          }}
        />
      )}
      {!isDraging && _isFull && (
        <Animated.View
          style={[
            { width },
            {
              opacity: _translateY.current.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <VideoMeta isFull={_isFull} />
        </Animated.View>
      )}
    </Animated.View>
  );
}

export default memo(VideoModal);
