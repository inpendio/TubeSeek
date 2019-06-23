import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { actionSetBitchuteVideoSource } from 'store';
import { useDispatch } from 'react-redux';
import { JS_GET_BITCHUTE_VIDEO_SOURCE } from './utils';
import styles from './styles';

function BitchuteVideoFetcher({ url }) {
  const dispatch = useDispatch();
  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      dispatch(actionSetBitchuteVideoSource(data));
    } catch (error) {
      console.log({ error, data: event.nativeEvent.data });
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: url }}
      injectedJavaScript={JS_GET_BITCHUTE_VIDEO_SOURCE}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteVideoFetcher);
