import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { actionBitchuteAppendToFeed } from 'store';
import { useDispatch } from 'react-redux';
import { BITCHUTE_URI, JS_BITCHUTE_FEED_LOAD_MORE } from './utils';
import styles from './styles';

function BitchuteFeedLoadMore({
  name, offset, last, onSuccess,
}) {
  const dispatch = useDispatch();

  const onMessage = (event) => {
    let data;
    try {
      ({ data } = JSON.parse(event.nativeEvent.data));
      dispatch(actionBitchuteAppendToFeed({ data, name }));
      onSuccess();
    } catch (err) {
      ({
        nativeEvent: { data },
      } = event);
      console.log(err, data);
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_URI }}
      injectedJavaScript={JS_BITCHUTE_FEED_LOAD_MORE({ name, offset, last })}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteFeedLoadMore);
