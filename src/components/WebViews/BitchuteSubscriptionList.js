import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { actionSetBitchuteVideoSource } from 'store';
import { useDispatch } from 'react-redux';
import {
  JS_BITCHUTE_SUBSCRIPTION_LIST,
  BITCHUTE_SUBSCRIBTION_URI,
} from './utils';
import styles from './styles';

function BitchuteSubscriptionList({ onSuccess, onFailure }) {
  const dispatch = useDispatch();
  const onMessage = (event) => {
    let data;
    try {
      ({ data } = JSON.parse(event.nativeEvent.data));
      if (data && onSuccess) onSuccess(data);
    } catch (error) {
      if (onFailure) onFailure({ error, data: event.nativeEvent.data });
      console.log({ error, data: event.nativeEvent.data });
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_SUBSCRIBTION_URI }}
      injectedJavaScript={JS_BITCHUTE_SUBSCRIPTION_LIST}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteSubscriptionList);
