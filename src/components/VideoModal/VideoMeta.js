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

import Text from '../../components/Text';

function VideoMeta({ videoMeta, style }) {
  return (
    <ScrollView
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 20,
          flex: 1,
        },
        style,
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
            paddingVertical: 3,
            paddingHorizontal: 5,
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
        <BitchuteChannelInfoCard data={videoMeta.channel} />
      )}
      {/* <BitchuteNexVideos navigation={navigation} current={videoMeta} /> */}
    </ScrollView>
  );
}

export default VideoMeta;
