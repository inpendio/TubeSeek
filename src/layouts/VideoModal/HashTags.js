import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { colors } from 'config';

function Hashtags({ hashtags }) {
  return (
    <View key="video_hashtags" style={{ flexDirection: 'row' }}>
      {hashtags
        && hashtags.map(ht => (
          <Text
            body4
            key={ht.link}
            style={{ color: colors.secondary, marginLeft: 3 }}
          >
            {ht.text}
          </Text>
        ))}
    </View>
  );
}

export default memo(Hashtags);
