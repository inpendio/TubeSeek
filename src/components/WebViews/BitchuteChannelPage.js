import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_BITCHUTE_CHANNEL_PAGE_DATA } from './utils';
import styles from './styles';

function BitchuteChannelPage({ url, onSuccess }) {
  const onMessage = (event) => {
    let data;
    try {
      ({ data } = JSON.parse(event.nativeEvent.data));
      if (data && onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: url }}
      injectedJavaScript={JS_BITCHUTE_CHANNEL_PAGE_DATA}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteChannelPage);
