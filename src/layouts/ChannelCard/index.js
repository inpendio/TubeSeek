import React, { memo } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text, Card } from 'components';

function ChannelCard({
  image, link, name, navigate, description,
}) {
  return (
    <Card
      style={{ flexDirection: 'row' }}
      onPress={() => {
        navigate('ChannelView', { url: link });
      }}
    >
      <Avatar size="large" source={{ uri: image }} />
      <View style={{ paddingHorizontal: 20, paddingVertical: 5, flex: 1 }}>
        <Text h3 b>
          {name}
        </Text>
        <Text
          body3
          ellipsizeMode="tail"
          // style={{ maxWidth: '100%' }}
          numberOfLines={3}
        >
          {description}
        </Text>
      </View>
    </Card>
  );
}

export default memo(ChannelCard);
