import React, { memo } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text } from 'components';
import styles from './styles';

function BitchuteChannelView({ data }) {
  if (!data.name.text) return null;
  return (
    <View style={[styles.wrapper]}>
      <Avatar
        rounded
        source={{
          uri: data.image,
        }}
        size="small"
      />
      <View style={styles.box}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text key="name" style={{ alignItems: 'flex-end' }} body1>
            {data.name.text}
          </Text>
          <Text key="subs" style={{ alignItems: 'flex-end' }} body1>
            {data.subCount}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(BitchuteChannelView);
