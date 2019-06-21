import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import styles from './styles';

const iconColor = '#666';

function HeaderRight({ navigation: { openDrawer } }) {
  return (
    <View style={styles.wrapper}>
      <Icon
        containerStyle={styles.icon}
        color={iconColor}
        name="list"
        type="feather"
      />
      <Icon
        containerStyle={styles.icon}
        name="more-vertical"
        type="feather"
        color={iconColor}
        onPress={openDrawer}
      />
    </View>
  );
}

export default HeaderRight;
