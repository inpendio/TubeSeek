import React, { memo } from 'react';
import {
  View as RNView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';

import { BitchuteChannelInfoCard, BitchuteNexVideos } from 'layouts';
import HashTags from './HashTags';
import ViewCount from './ViewCount';
import Description from './Description';

function VideoMeta({ style }) {
  const videoMeta = useSelector(s => s.video.currentVideo);
  const navigation = useSelector(s => s.general.navigation);
  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'flex-start' }}
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: '100%',
          zIndex: 999999,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <TouchableWithoutFeedback>
        <RNView>
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
          <Description
            title={videoMeta.text}
            description={videoMeta.description}
          />
          {videoMeta.channel && !!navigation && (
            <BitchuteChannelInfoCard
              data={videoMeta.channel}
              navigation={navigation}
            />
          )}
          {!!navigation && (
            <BitchuteNexVideos navigation={navigation} current={videoMeta} />
          )}
        </RNView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

export default memo(VideoMeta);
