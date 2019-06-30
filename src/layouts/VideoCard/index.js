import React, { memo } from 'react';
import {
  View as RNView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { View } from 'react-native-magic-move';
import { Icon } from 'react-native-elements';
import { Card, Text } from 'components';
import { colors } from 'config';
import {
  actionFetchBitchuteVideoSource,
  actionBitchuteAddToQueue,
} from 'store';
import Interactable from 'react-native-interactable';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function VideoCard({
  navigation: { navigate }, item, feed, provider,
}) {
  const dispatch = useDispatch();
  const adToQueueIconAnimation = new Animated.Value(0);
  const addToQueue = () => {
    if (provider === 'bitchute') {
      dispatch(actionBitchuteAddToQueue({ item, feed }));
      Animated.spring(adToQueueIconAnimation, {
        toValue: 4,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Interactable.View
      horizontalOnly
      alertAreas={[{ id: 'addQueue', influenceArea: { right: -60 } }]}
      onAlert={({ nativeEvent: { addQueue } }) => {
        console.log('alert!!', addQueue);
        if (addQueue === 'enter') addToQueue();
      }}
      snapPoints={[{ x: 0 }, { x: 0 }]}

      /* animatedValueX={avx} */
    >
      <Card>
        <RNView id={item.thumbnail}>
          <TouchableOpacity
            onPress={() => {
              dispatch(actionFetchBitchuteVideoSource(item));
              navigate('Video', { imageUrl: item.thumbnail });
            }}
          >
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
          <Text
            h3
            onPress={() => {
              dispatch(actionFetchBitchuteVideoSource(item));
              navigate('Video', { imageUrl: item.thumbnail });
            }}
          >
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
            <Animated.View
              style={{
                transform: [
                  {
                    scale: adToQueueIconAnimation.interpolate({
                      inputRange: [0, 1, 2, 3, 4],
                      outputRange: [1, 1.2, 1, 0.8, 1],
                    }),
                  },
                ],
              }}
            >
              <Icon
                name="queue"
                type="material"
                color={item.inQueue ? colors.success : colors.gray1}
              />
            </Animated.View>
          </RNView>
        </RNView>
      </Card>
    </Interactable.View>
  );
}

export default memo(VideoCard);
