import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_BITCHUTE_CHANNEL_PAGE_DATA } from './utils';
import styles from './styles';

function TestView({ url = 'https://www.bitchute.com/channel/surga/' }) {
  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WebView
      source={{ uri: url }}
      injectedJavaScript={JS_BITCHUTE_CHANNEL_PAGE_DATA}
      onMessage={onMessage}
      originWhitelist={['https://www.bitchute.com/channel/*']}
    />
  );
}

export default memo(TestView);
