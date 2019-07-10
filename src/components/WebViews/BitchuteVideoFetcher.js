import React, { memo, useState } from 'react';
import WebView from 'react-native-webview';
import { actionSetBitchuteVideoSource } from 'store';
import { useDispatch } from 'react-redux';
import { JS_GET_BITCHUTE_VIDEO_SOURCE } from './utils';
import styles from './styles';

function BitchuteVideoFetcher({ url, onSuccess }) {
  const dispatch = useDispatch();
  const [html, setHtml] = useState(null);
  if (!html) {
    fetch(url)
      .then(r => r.text())
      .then((t) => {
        const finalT = t.replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          '',
        );
        // .replace(/<link rel="stylesheet" type="text\/css"[^>]*\/>/gm, '');
        setHtml(finalT);
      })
      .catch(e => console.log(e));
  }
  const onMessage = (event) => {
    try {
      const { source, meta } = JSON.parse(event.nativeEvent.data);
      // dispatch(actionSetBitchuteVideoSource(data));
      onSuccess({ ...meta, source, videoLink: url });
    } catch (error) {
      console.log({ error, data: event.nativeEvent.data, url });
    }
  };
  if (!html) return null;
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
