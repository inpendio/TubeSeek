import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_BITCHUTE_LOGOUT, BITCHUTE_LOGOUT_URI } from './utils';
import styles from './styles';

function BitchuteLogout({ onSuccess, onFailure }) {
  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      if (data.login && onFailure) {
        onFailure();
      }
      if (!data.login && onSuccess) {
        onSuccess({ logout: 'success' });
      }
    } catch (error) {
      data = event.nativeEvent.data;
      console.log(error, data);
      if (onFailure) onFailure({ error, data });
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_LOGOUT_URI }}
      injectedJavaScript={JS_BITCHUTE_LOGOUT}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteLogout);
