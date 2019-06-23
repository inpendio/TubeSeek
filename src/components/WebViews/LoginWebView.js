import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { BITCHUTE_LOGIN_URI, JS_BITCHUTE_LOGIN, ERRORS } from './utils';
import styles from './styles';

function LoginWebView({ onSuccess, onFailure, data }) {
  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      if (data.error && onFailure) {
        onFailure(ERRORS[data.error]);
      }
      if (data.login && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onFailure) onFailure({ error, data });
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_LOGIN_URI }}
      injectedJavaScript={JS_BITCHUTE_LOGIN(data)}
      onMessage={onMessage}
    />
  );
}

export default memo(LoginWebView);
