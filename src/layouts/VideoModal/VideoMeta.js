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
import {
  Accordion, TextBlock, Loader, Text,
} from 'components';
import { BitchuteChannelInfoCard, BitchuteNexVideos } from 'layouts';
import { colors } from 'config';
import HashTags from './HashTags';
import ViewCount from './ViewCount';
import Description from './Description';

function VideoMeta({ style }) {
  const videoMeta = useSelector(s => s.video.meta);
  return (
    <ScrollView
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: '100%',
        },
        style,
      ]}
    >
      <RNView
        key="video_meta"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <HashTags hashtags={videoMeta.hashtags} />
        <ViewCount views={videoMeta.views} />
      </RNView>
      <Description title={videoMeta.text} description={videoMeta.description} />
      {videoMeta.channel && (
        <BitchuteChannelInfoCard data={videoMeta.channel} />
      )}
      {/* <BitchuteNexVideos navigation={navigation} current={videoMeta} /> */}
    </ScrollView>
  );
}

export default VideoMeta;
