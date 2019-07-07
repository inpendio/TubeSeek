import React, { memo, useState } from 'react';
import {
  View as RNView,
  Image,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
// import Video from 'react-native-video';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { actionCleanVideo } from 'store';
import Interactable from 'react-native-interactable';
import { Accordion, TextBlock, Loader } from 'components';
import { BitchuteChannelInfoCard, BitchuteNexVideos } from 'layouts';
import { colors } from 'config';

import Text from '../Text';
import Video from './Video';

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
    HEIGHT: { height: width * 0.5625 },
    STYLE_VIDEO: { top: 0 /* , height: width * 0.5625 */ },
    STYLE_META: {},
  };
  const DIMINISHED_PORTRAIT = {
    HEIGHT: { height: 145 },
    STYLE_VIDEO: { width: 240, bottom: 300 },
    STYLE_META: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      flex: 0,
      height: 0,
    },
  };
  const FULLSCREEN_LANDSCAPE = {
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
    /* setWHStyle({ width: 240, bottom: 300 });
    setH(145); */
    setStyleState('diminished');
  };
  const transformToTop = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    /* setWHStyle({ top: 56 });
    setH(250); */
    setStyleState('full');
  };
  if (!provider) return null;
  return (
    <Interactable.View
      style={[
        {
          position: 'absolute',

          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: colors.white || 'white',
          alignItems: 'flex-start',
        },
        styleMap[`${styleState}_${orientation}`].STYLE_VIDEO,
      ]}
      snapPoints={[{ y: 0, id: 'up' }, { y: 300, id: 'down' }]}
      onSnap={({ nativeEvent }) => {
        console.log(nativeEvent);
        if (nativeEvent.id === 'down') transformToBottom();
        if (nativeEvent.id === 'up') transformToTop();
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

      {/* videoLink ? (
        <Video
          source={{ uri: videoLink }}
          style={[
            { width: '100%' },
            styleMap[`${styleState}_${orientation}`].HEIGHT,
          ]}
          fullscreen={orientation === 'landscape'}
          controls
          playInBackground
          playWhenInactive
        />
      ) : (
        <Image
          source={{ uri: videoMeta && videoMeta.thumbnail }}
          style={styleMap[`${styleState}_${orientation}`].HEIGHT}
          resizeMode="contain"
        />
      ) */}
      <ScrollView
        style={[
          {
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
          },
          styleMap[`${styleState}_${orientation}`].STYLE_META,
        ]}
      >
        <RNView
          key="video_meta"
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <RNView key="video_hashtags" style={{ flexDirection: 'row' }}>
            {videoMeta.hashtags
              && videoMeta.hashtags.map(ht => (
                <Text
                  body4
                  key={ht.link}
                  style={{ color: colors.secondary, marginLeft: 3 }}
                >
                  {ht.text}
                </Text>
              ))}
          </RNView>
          <RNView
            style={{
              // backgroundColor: colors.primary,
              // color: colors.white,
              paddingVertical: 3,
              paddingHorizontal: 5,
              /* position: 'absolute',
            top: 0,
            left: 0, */
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              type="material"
              name="visibility"
              color={colors.secondary}
              size={14}
            />
            <Text
              style={{
                color: colors.secondary,
                marginLeft: 3,
              }}
            >
              {videoMeta.views}
            </Text>
          </RNView>
        </RNView>
        <Accordion title={videoMeta.text}>
          {
            <RNView>
              {videoMeta.description && (
                <TextBlock data={videoMeta.description} />
              )}
            </RNView>
          }
        </Accordion>
        {videoMeta.channel && (
          <BitchuteChannelInfoCard
            data={videoMeta.channel}
            // navigation={navigation}
          />
        )}
        {/* <BitchuteNexVideos navigation={navigation} current={videoMeta} /> */}
      </ScrollView>
    </Interactable.View>
  );
  /* return (
    <Modal
      isVisible={!!meta}
      avoidKeyboard
      style={{
        height: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      coverScreen={false}
      onBackButtonPress={() => {
        dispatch(actionCleanVideo());
      }}
    >
      <RNView style={{ flex: 1, backgroundColor: 'red', height: 300 }}>
        {videoLink ? (
          <Video
            source={{ uri: videoLink }}
            style={{ height: 300, width: '100%' }}
            controls
          />
        ) : (
          <Image
            source={{ uri: meta && meta.thumbnail }}
            style={{ height: 300 }}
            resizeMode="contain"
          />
        )}
      </RNView>
    </Modal>
  ); */
}

export default memo(VideoModal);
