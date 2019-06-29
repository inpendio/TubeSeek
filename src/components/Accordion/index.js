import React, { useState, memo } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Text from '../Text';
import styles from './styles';

function Accordion({
  title,
  children,
  style = {},
  titleStyle = {},
  titleTextProps = {},
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.titleWrapper, titleStyle]}>
        <Text h3 style={{ maxWidth: '80%' }} {...titleTextProps}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setOpen(!open);
          }}
          style={styles.icon}
        >
          <Icon
            type="material"
            name={open ? 'expand-less' : 'expand-more'}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.childrenWrapper, open ? { flex: 1 } : styles.closed]}
      >
        {!!open && children}
      </View>
    </View>
  );
}

export default memo(Accordion);
