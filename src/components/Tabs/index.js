import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import Text from '../Text';
import styles from './styles';

function Tabs({ tabs, index, onChange }) {
  return (
    <ScrollView horizontal>
      {tabs.map((t, i) => (
        <Text
          key={`tabs_${t}_${i + 1}`}
          style={[styles.textBase, i === index ? styles.textActive : {}]}
          onPress={() => onChange(i)}
        >
          {t.toUpperCase()}
        </Text>
      ))}
    </ScrollView>
  );
}

export default memo(Tabs);
