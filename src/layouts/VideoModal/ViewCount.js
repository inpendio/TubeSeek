import React, { memo } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from 'components';
import { colors } from 'config';

function ViewCount({ views }) {
  return (
    <View
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
        {views}
      </Text>
    </View>
  );
}

export default memo(ViewCount);
