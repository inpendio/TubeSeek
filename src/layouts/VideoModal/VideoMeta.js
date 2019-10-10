import React, { memo } from 'react';
import {
  View as RNView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from 'config';
import { Text } from 'components';
import { BitchuteChannelInfoCard, BitchuteNexVideos, VideoCard } from 'layouts';
import HashTags from './HashTags';
import ViewCount from './ViewCount';
import Description from './Description';

function VideoMeta({ style }) {
  const videoMeta = useSelector(s => s.video.currentVideo);
  const navigation = useSelector(s => s.general.navigation);
  const queue = useSelector(s => s.video.queue);
  let nextVideo = null;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].videoLink !== videoMeta.videoLink) {
      nextVideo = queue[i];
      break;
    }
  }
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
        {nextVideo && (
          <RNView>
            <RNView
              style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 15,
                marginTop: 15,
              }}
            >
              <Text h2 style={{ color: colors.white }}>
                Next
              </Text>
            </RNView>
            <RNView>
              <VideoCard item={nextVideo} navigation={navigation} />
            </RNView>
          </RNView>
        )}
        {!!navigation && (
          <BitchuteNexVideos navigation={navigation} current={videoMeta} />
        )}
      </RNView>
    </ScrollView>
  );
}

export default memo(VideoMeta);
