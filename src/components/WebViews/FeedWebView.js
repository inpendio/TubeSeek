import React, { useState, memo } from 'react';
import WebView from 'react-native-webview';
import {
  actionBitchuteAddSubsribeFeed,
  actionBitchuteLogOut,
  actionBitchuteAddPopularFeed,
  actionBitchuteAddAllFeed,
  actionBitchuteAddTrendingFeed,
} from 'store';
import { useDispatch } from 'react-redux';
import { BITCHUTE_URI, JS_FEED } from './utils';
import styles from './styles';

function FeedWebView() {
  const dispatch = useDispatch();

  const onMessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.nativeEvent.data);
      console.log(data);
      if (data.parsedData && data.list.subscribed.parsed.length > 0) {
        dispatch(actionBitchuteAddSubsribeFeed(data.list.subscribed.parsed));
      }
      if (data.parsedData && data.list.all.parsed.length > 0) {
        dispatch(actionBitchuteAddAllFeed(data.list.all.parsed));
      }
      if (data.parsedData && data.list.popular.parsed.length > 0) {
        dispatch(actionBitchuteAddPopularFeed(data.list.popular.parsed));
      }
      if (
        data.parsedData
        && data.list.trendingDay.parsed.length > 0
        && data.list.trendingWeek.parsed.length > 0
        && data.list.trendingMonth.parsed.length > 0
      ) {
        dispatch(
          actionBitchuteAddTrendingFeed({
            trendingDay: data.list.trendingDay.parsed,
            trendingWeek: data.list.trendingWeek.parsed,
            trendingMonth: data.list.trendingMonth.parsed,
          }),
        );
      }
      if (!data.parsed && data.login === false) {
        dispatch(actionBitchuteLogOut());
      }
    } catch (err) {
      ({
        nativeEvent: { data },
      } = event);
      console.log(err, data);
    }
  };
  console.log(JS_FEED);
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: BITCHUTE_URI }}
      injectedJavaScript={JS_FEED}
      onMessage={onMessage}
    />
  );
}

export default memo(FeedWebView);
