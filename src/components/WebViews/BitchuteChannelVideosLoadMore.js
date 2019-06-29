import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_BITCHUTE_CHANNEL_VIDEO_LIST_SHOW_MORE } from './utils';
import styles from './styles';

function BitchuteChanelVideosMoadMore({ url, onSuccess, offset = 25 }) {
  const onMessage = (event) => {
    let data;
    console.log(event.nativeEvent.data);
    try {
      data = JSON.parse(event.nativeEvent.data);
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
      injectedJavaScript={JS_BITCHUTE_CHANNEL_VIDEO_LIST_SHOW_MORE(offset)}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteChanelVideosMoadMore);
