import React from 'react';
import { Image, View as RNView, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Scene, View } from 'react-native-magic-move';
import Video from 'react-native-video';

import { useSelector } from 'react-redux';
import { Accordion, TextBlock, Loader } from 'components';
import { BitchuteChannelInfoCard } from 'layouts';
import { colors } from 'config';
import BitchuteNexVideos from '../BitchuteNexVideos';

function BitchuteVideoView({ navigation, thumbnail }) {
  const videoLink = useSelector(s => s.video.link);
  const videoMeta = useSelector(s => s.video.meta);

  return (
    <RNView style={{ flex: 1 /* , backgroundColor: 'yellow' */ }}>
      {videoLink ? (
        <Video
          source={{ uri: videoLink }}
          style={{ height: 250 /* , width: '100%' */ }}
          controls
          resizeMode="contain"
          fullscreenOrientation="all"
          // fullscreen
          onBuffer={(b) => {
            console.log(b);
          }}
          onError={(e) => {
            console.log(e);
          }}
        />
      ) : (
        <Image
          source={{ uri: thumbnail }}
          style={{ height: 250, width: '100%' }}
          resizeMode="contain"
        />
      )}
      {!videoLink && (
        <Loader
          style={{
            width: '100%',
            height: 250,
            position: 'absolute',
            top: 0,
          }}
          size="large"
        />
      )}
      <ScrollView
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <RNView
          key="video_meta"
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <RNView key="video_hashtags" style={{ flexDirection: 'row' }}>
            {videoMeta.hashtags
              && videoMeta.hashtags.map(h => (
                <Text
                  body4
                  key={h.link}
                  style={{ color: colors.secondary, marginLeft: 3 }}
                >
                  {h.text}
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
            navigation={navigation}
          />
        )}
        <BitchuteNexVideos navigation={navigation} current={videoMeta} />
      </ScrollView>
    </RNView>
  );
}
export default BitchuteVideoView;
