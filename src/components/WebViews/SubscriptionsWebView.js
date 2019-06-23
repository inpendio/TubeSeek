import React, { useState, memo } from 'react';
import WebView from 'react-native-webview';
import { getBitchuteSessionCookie } from 'utils';
import { BITCHUTE_URI, JS_FEED } from './utils';
import styles from './styles';

function SubscriptionsWebView() {
  const [cookie, setCookie] = useState(null);

  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      if (data.parsedData) console.log(data);
    } catch (_) {
      data = event.nativeEvent.data;
    }
  };
  if (!cookie) {
    const c = getBitchuteSessionCookie().then((c) => {
      setCookie(c);
    });
    return null;
  }
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_URI }}
      injectedJavaScript={JS_FEED(cookie)}
      onMessage={onMessage}
    />
  );
}

export default memo(SubscriptionsWebView);
