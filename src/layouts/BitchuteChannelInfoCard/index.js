import React, { memo } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text } from 'components';
import styles from './styles';

function BitchuteChannelInfoCard({ data, navigation: { navigate } }) {
  if (!data.name.text) return null;
  return (
    <View style={[styles.wrapper, styles.box]}>
      <Avatar
        rounded
        source={{
          uri: data.image,
        }}
        size="medium"
      />
      <View style={styles.textBlock}>
        <Text
          onPress={
            data.name.link
              ? () => {
                navigate('BitchuteChannelView', { url: data.name.link });
              }
              : () => {}
          }
          key="name"
          style={{ alignItems: 'flex-end', padding: 5 }}
          body1
        >
          {data.name.text}
        </Text>
        <Text key="subs" style={{ alignItems: 'flex-end' }} body1>
          {data.subCount}
        </Text>
      </View>
    </View>
  );
}

export default memo(BitchuteChannelInfoCard);
