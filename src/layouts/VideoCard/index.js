import React, { memo } from 'react';
import {
  View as RNView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Card, Text } from 'components';
import { colors } from 'config';
import {
  actionBitchuteAddToQueue,
  actionBitchuteRemoveToQueue,
  actionVideoSetCurrentVideo,
} from 'store';
import Interactable from 'react-native-interactable';

function VideoCard({
  navigation: { navigate }, item, feed, provider,
}) {
  const dispatch = useDispatch();
  const addToQueue = () => {
    if (provider === 'bitchute') {
      dispatch(actionBitchuteAddToQueue({ ...item, feed, provider }));
    }
  };
  const removeFromQueue = () => {
    if (provider === 'bitchute') {
      dispatch(actionBitchuteRemoveToQueue({ ...item, feed, provider }));
    }
  };
  const playVideo = () => {
    dispatch(actionVideoSetCurrentVideo({ ...item, provider: 'bitchute' }));
    // dispatch(actionFetchBitchuteVideoSource(item));
    // navigate('Video', { imageUrl: item.thumbnail });
  };

  return (
    <Interactable.View
      horizontalOnly
      alertAreas={[
        { id: 'addQueue', influenceArea: { right: -150 } },
        { id: 'removeQueue', influenceArea: { left: 150 } },
      ]}
      onAlert={({ nativeEvent: { addQueue, removeQueue } }) => {
        if (addQueue === 'enter') addToQueue();
        if (removeQueue === 'enter') removeFromQueue();
      }}
      snapPoints={[{ x: 0 }, { x: 0 }]}
    >
      <Card>
        <RNView id={item.thumbnail}>
          <TouchableOpacity onPress={playVideo}>
            <Image
              style={{ flex: 1, height: 200 }}
              resizeMode="cover"
              source={{ uri: item.thumbnail }}
            />
            {!!item.duration && (
              <Text
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                {item.duration}
              </Text>
            )}
            <RNView
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                paddingVertical: 3,
                paddingHorizontal: 5,
                position: 'absolute',
                top: 0,
                left: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                type="material"
                name="visibility"
                color={colors.white}
                size={14}
              />
              <Text
                style={{
                  color: colors.white,
                  marginLeft: 3,
                }}
              >
                {item.views}
              </Text>
            </RNView>
          </TouchableOpacity>
        </RNView>
        <RNView style={{ paddingHorizontal: 10, paddingVertical: 7 }}>
          <Text h3 onPress={playVideo}>
            {item.text}
          </Text>
          <RNView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text body4 style={{ color: colors.secondary }}>
              {item.timePublished}
            </Text>

            {item.channel && item.channel.name && (
              <Text
                body2
                style={{ padding: 5, color: colors.primary }}
                onPress={() => navigate('ChannelView', { url: item.channel.link })
                }
              >
                {item.channel.name}
              </Text>
            )}
          </RNView>
          <RNView
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Icon
              name="queue"
              type="material"
              color={item.inQueue ? colors.success : colors.gray1}
              onPress={item.inQueue ? removeFromQueue : addToQueue}
            />
          </RNView>
        </RNView>
      </Card>
    </Interactable.View>
  );
}

export default memo(VideoCard);
