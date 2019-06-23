import React, { memo } from 'react';
import { View, Linking } from 'react-native';
import { colors } from 'config';
import Text from '../Text';

function TextBlock({ data }) {
  const renderText = (t, i) => <Text key={`textblock_text_${i}`}>{t}</Text>;
  const renderLink = l => (
    <Text
      key={`${l.link}`}
      onPress={() => {
        Linking.openURL(l.link);
      }}
      style={{ color: colors.primary }}
    >
      {l.text}
    </Text>
  );
  const renderArray = arr => arr.map((a, i) => {
    if (a.link && a.text) {
      return renderLink(a);
    }
    return renderText(a, i + 9999);
  });
  return (
    <View>
      {data.map((e, i) => {
        if (Array.isArray(e)) return renderText(renderArray(e), i);
        return renderText(e, i);
      })}
    </View>
  );
}

export default memo(TextBlock);
