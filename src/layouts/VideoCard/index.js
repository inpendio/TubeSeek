import React, { memo } from 'react';
import { View as RNView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { View } from 'react-native-magic-move';
import { Icon } from 'react-native-elements';
import { Card, Text } from 'components';
import { colors } from 'config';
import { actionFetchBitchuteVideoSource } from 'store';

function VideoCard({ navigation: { navigate }, item }) {
  const dispatch = useDispatch();
  return (
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
        <Text h3>{item.text}</Text>
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
          <Text body2 style={{ padding: 5, color: colors.primary }}>
            {item.channel.name}
          </Text>
        </RNView>
      </RNView>
    </Card>
  );
}

export default memo(VideoCard);
