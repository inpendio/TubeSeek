import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { actionAppendSearchResults } from 'store';
import { BITCHUTE_SEARCCH_URI, JS_BITCHUTE_SEARCH_PARSE } from './utils';
import styles from './styles';

function BitchuteSearch({ page, search, type }) {
  const dispatch = useDispatch();
  const onMessage = (event) => {
    let data;
    try {
      ({ data } = JSON.parse(event.nativeEvent.data));
      console.log(data);
      if (data) {
        dispatch(actionAppendSearchResults(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_SEARCCH_URI(search, type, page) }}
      injectedJavaScript={JS_BITCHUTE_SEARCH_PARSE}
      onMessage={onMessage}
    />
  );
}

export default memo(BitchuteSearch);
