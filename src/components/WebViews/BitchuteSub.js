import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_BITCHUTE_SUB } from './utils';
import styles from './styles';

function BitchuteSub({ url, onSuccess }) {
  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      if (data && data.success && onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('end onMessage');
  };
  console.log(url);
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: url }}
      injectedJavaScript={JS_BITCHUTE_SUB}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteSub);
