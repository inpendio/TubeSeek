import React, { memo } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { Text } from 'components';
import styles from './styles';

function BitchuteChannelInfoCard({ data, navigation: { navigate } }) {
  if (!data.name) return null;
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
            data.link
              ? () => {
                navigate('ChannelView', { url: data.link });
              }
              : () => {}
          }
          key="name"
          style={{ alignItems: 'flex-end', padding: 5 }}
          body1
        >
          {data.name}
        </Text>
        <Text key="subs" style={{ alignItems: 'flex-end' }} body1>
          {data.subCount}
        </Text>
      </View>
    </View>
  );
}

export default memo(BitchuteChannelInfoCard);
