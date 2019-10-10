import React, { memo } from 'react';
import WebView from 'react-native-webview';
import { JS_GET_BITCHUTE_VIDEO_SOURCE } from './utils';
import styles from './styles';

if (__DEV__) {
  console.groupCollapsed('BitchuteVideoFetcher Script');
  console.log(JS_GET_BITCHUTE_VIDEO_SOURCE);
  console.groupEnd();
}

function BitchuteVideoFetcher({ url, onSuccess, onFail }) {
  /* const dispatch = useDispatch();
  const [html, setHtml] = useState(null);
  if (!html) {
    fetch(url)
      .then(r => r.text())
      .then((t) => {
        console.log(t);
        const finalT = t.replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          '',
        );
        // .replace(/<link rel="stylesheet" type="text\/css"[^>]*\/>/gm, '');
        setHtml(finalT);
      })
      .catch(e => console.log(e, url));
  } */
  const onMessage = (event) => {
    try {
      const { source, meta, error } = JSON.parse(event.nativeEvent.data);
      // dispatch(actionSetBitchuteVideoSource(data));
      if (source) onSuccess({ ...meta, source, videoLink: url });
      else if (error) onFail({ error, meta });
    } catch (error) {
      console.log({ error, data: event.nativeEvent.data, url });
    }
  };
  // if (!html) return null;
  return (
    <WebView
      style={styles.hidden}
      source={{ uri: url }}
      injectedJavaScript={JS_GET_BITCHUTE_VIDEO_SOURCE}
      onMessage={onMessage}
      // onNavigationStateChange={(loading) => {
      //   console.log(loading);
      // }}
    />
  );
}

export default memo(BitchuteVideoFetcher);
