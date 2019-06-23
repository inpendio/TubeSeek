import React, { useState, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Text from '../Text';
import styles from './styles';

function Accordion({ title, children, style = {} }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.titleWrapper}>
        <Text h3 style={{ maxWidth: '80%' }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
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
      {open && <View style={styles.childrenWrapper}>{children}</View>}
    </View>
  );
}

export default memo(Accordion);
