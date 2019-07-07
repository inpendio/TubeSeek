import React, { memo, useState } from 'react';
import {
  View as RNView,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
// import Video from 'react-native-video';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { actionCleanVideo } from 'store';
import Interactable from 'react-native-interactable';
import {
  Accordion, TextBlock, Loader, Text,
} from 'components';
import { BitchuteChannelInfoCard, BitchuteNexVideos } from 'layouts';
import { colors } from 'config';

import Video from './Video';
import VideoMeta from './VideoMeta';

function VideoModal() {
  const provider = useSelector(s => s.video.provider);
  const videoLink = useSelector(s => s.video.link);
  const videoMeta = useSelector(s => s.video.meta);
  const height = useSelector(s => s.general.dimensions.height);
  const width = useSelector(s => s.general.dimensions.width);
  const orientation = useSelector(s => s.general.dimensions.orientation);
  const dispatch = useDispatch();
  const [styleState, setStyleState] = useState('full');
  const [whStyle, setWHStyle] = useState({ top: 56 });
  const [h, setH] = useState(250);
  if (!videoMeta) return null;
  const FULLSCREEN_PORTRAIT = {
    WRAPPER: {
      ...StyleSheet.absoluteFill,
    },
    HEIGHT: { height: width * 0.5625 },
    STYLE_VIDEO: { top: 0 /* , height: width * 0.5625 */ },
    STYLE_META: { flex: 1 },
  };
  const DIMINISHED_PORTRAIT = {
    WRAPPER: {
      // ...StyleSheet.absoluteFill,
      // top: height - 240,
      /* left: 0, */
      // width: 240,
      bottom: 0,
      height: 145,
    },
    HEIGHT: { height: 145 },
    STYLE_VIDEO: { flex: 1 /* width: 240, bottom: 300 */ },
    STYLE_META: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      /* flex: 0, */
      position: 'absolute',
      height: 0,
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
  if (!provider) return null;
  return (
    <RNView
      style={[
        /* { ...StyleSheet.absoluteFill }, */
        /* { position: 'absolute', zIndex: 999 }, */
        styleMap[`${styleState}_${orientation}`].WRAPPER,
      ]}
    >
      <Interactable.View
        style={[
          {
            /* flex: 1, */
            ...StyleSheet.absoluteFill,
            zIndex: 9999,
          },
        ]}
        /* snapPoints={[{ y: 0, id: 'up' }, { y: 300, id: 'down' }]}
        onSnap={({ nativeEvent }) => {
          console.log(nativeEvent);
          if (nativeEvent.id === 'down') transformToBottom();
          if (nativeEvent.id === 'up') transformToTop();
        }} */
        snapPoints={[{ x: 0 }, { x: 0 }]}
        alertAreas={[{ id: 'down', influenceArea: { top: 300 } }]}
        onAlert={({ nativeEvent: { up, down } }) => {
          if (down === 'enter') transformToBottom();
        }}
        onDrag={({ nativeEvent }) => {
          console.log(nativeEvent);
        }}
      >
        <Video
          videoLink={videoLink}
          thumbnailLink={videoMeta && videoMeta.thumbnail}
          style={styleMap[`${styleState}_${orientation}`].HEIGHT}
        />
      </Interactable.View>
      <VideoMeta style={styleMap[`${styleState}_${orientation}`].STYLE_META} />
    </RNView>
  );
}

export default memo(VideoModal);
