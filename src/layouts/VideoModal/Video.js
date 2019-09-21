import React, {
  memo, useState, useEffect, useRef,
} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'components';
import { actionBitchuteRemoveToQueue, actionVideoPlayNext } from 'store';
import Controls from './Controls';

const Atwf = Animated.createAnimatedComponent(TouchableWithoutFeedback);
// const AControls = Animated.createAnimatedComponent(Controls);

const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFill,
  },
  controlsWrapper: {
    flex: 1,
  },
  controls: {
    ...StyleSheet.absoluteFill,
  },
});

function VideoBox({
  videoLink, thumbnailLink, style, isFull,
}) {
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const paused = useSelector(s => s.video.currentVideo.paused);
  const isInBackground = useSelector(s => s.general.isInBackground);
  const dispatch = useDispatch();
  const [controlsVisible, setControlsVisible] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (controlsVisible) {
      timer.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2000);
    }
  }, [controlsVisible]);

  if (videoLink) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('@Video/touchable on press');
          // clearTimeout(timer.current);
          // setControlsVisible(controlsVisible + 1);
        }}
        style={{ zIndex: 999999 }}
      >
        <View style={[style]}>
          <Video
            onPress={() => {
              console.log('video on press');
            }}
            key="video_player"
            source={{ uri: videoLink }}
            fullscreen={orientation === 'landscape'}
            paused={paused}
            audioOnly={isInBackground}
            // poster={thumbnailLink}
            playInBackground
            playWhenInactive
            onReadyForDisplay={() => {
              dispatch(actionBitchuteRemoveToQueue({ videoLink }));
            }}
            onEnd={() => {
              dispatch(actionVideoPlayNext());
            }}
            onPlaybackRateChange={(a, b) => {
              console.log('onPlaybackRateChange', a, b);
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
          />
          {!!controlsVisible && (
            <Controls
              key="video_controls"
              visible={controlsVisible}
              style={styles.controls}
              closeControls={() => {
                setControlsVisible(0);
              }}
              isFull={isFull}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={[style]} key="thumbnail">
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
    </View>
  );
}

export default memo(VideoBox);
