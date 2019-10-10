import React, { memo } from 'react';
import WebView from 'react-native-webview';
import {
  actionBitchuteAddSubsribeFeed,
  actionBitchuteLogOut,
  actionBitchuteAddPopularFeed,
  actionBitchuteAddAllFeed,
  actionBitchuteAddTrendingFeed,
  actionBitchuteReloadAllFalse,
  actionToggleLoading,
} from 'store';
import { useDispatch } from 'react-redux';
import { BITCHUTE_URI, JS_FEED } from './utils';
import styles from './styles';

if (__DEV__) {
  console.groupCollapsed('FeedWebView Script');
  console.log(JS_FEED);
  console.groupEnd();
}

function FeedWebView() {
  const dispatch = useDispatch();

  const onMessage = (event) => {
    let data;
    if (__DEV__) console.log(event.nativeEvent);
    try {
      data = JSON.parse(event.nativeEvent.data);
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
      dispatch(actionBitchuteReloadAllFalse());
      dispatch(actionToggleLoading());
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
      injectedJavaScript={JS_FEED}
      onMessage={onMessage}
      // onNavigationStateChange={(loading) => {
      //   console.log(loading);
      // }}
      // onError={(e) => {
      //   console.log(e);
      // }}
      // onLoadStart={(l) => {
      //   console.log(l);
      // }}
    />
  );
}

export default memo(FeedWebView);
