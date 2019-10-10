import React, {
  memo, useState, useEffect, useRef,
} from 'react';
import { View as RNView, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-magic-move';
import { Text, /* Button,  */ Icon } from 'react-native-elements';
import { bitchuteLogo, logoFull } from 'assets';
import { useSelector, useDispatch } from 'react-redux';
import {
  FeedWebView,
  BitchuteVideoFetcher,
  BitchuteSearch,
  Button,
} from 'components';
import {
  actionVideoUpdateCurrentVideo,
  actionVideoUpdateQueueItem,
  actionVideoSetCurrentlyFetching,
  actionBitchuteReloadAll,
  actionSetVideoError,
} from 'store';

import styles from './styles';

function Drawer(props) {
  const {
    navigation: { navigate },
  } = props;
  const dispatch = useDispatch();
  const [queueUpdate, setQueueUpdate] = useState(null);
  const bitchuteLogin = useSelector(state => state.bitchute.loggedIn);
  const reloadBitchute = useSelector(state => state.bitchute.reloadAll);
  const reloadBitchuteTimestamp = useSelector(
    state => state.bitchute.reloadAllTimeStamp,
  );
  const currentVideo = useSelector(s => s.video.currentVideo);
  const currentlyFetching = useSelector(s => s.video.currentlyFetching);
  const fetchQueue = useSelector(s => s.video.fetchQueue);
  const queue = useSelector(s => s.video.queue);
  const reloadTimeout = useRef(null);

  useEffect(() => {
    if (reloadBitchuteTimestamp === 0) {
      clearTimeout(reloadTimeout.current);
      reloadTimeout.current = null;
    } else {
      reloadTimeout.current = setTimeout(() => {
        dispatch(actionBitchuteReloadAll());
      }, 30000);
    }
  }, [reloadBitchuteTimestamp]);

  if (!!fetchQueue[0] && !queueUpdate && !currentlyFetching) {
    setQueueUpdate({
      url: fetchQueue[0],
      func: (data) => {
        dispatch(actionVideoUpdateQueueItem(data));
        setQueueUpdate(null);
      },
    });
    dispatch(actionVideoSetCurrentlyFetching(fetchQueue[0].videoLink));
  }

  const updateCurrentVideo = (data) => {
    dispatch(actionVideoUpdateCurrentVideo(data));
  };

  const videoFetchFail = ({ meta, error }) => {
    dispatch(actionSetVideoError(error));
  };

  /* console.log(1, currentVideo);
  console.log(2, queueUrl); */

  return (
    <RNView style={styles.wrapper}>
      <RNView>
        <RNView
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flex: 0,
          }}
        >
          <Image source={logoFull} resizeMode="contain" style={styles.logo} />
        </RNView>
        <RNView style={{ marginTop: 30 }}>
          <Button
            title="Subscriptions"
            type="clear"
            onPress={() => {
              navigate('BitchuteSubscriptions');
            }}
          />
          {queue.length > 0 && (
            <Button
              title="Queue"
              type="clear"
              onPress={() => {
                navigate('Queue');
              }}
            />
          )}
        </RNView>
      </RNView>
      {!!currentVideo
        && !currentVideo.source
        && !!currentVideo.videoLink
        && currentlyFetching !== currentVideo.videoLink && (
          <BitchuteVideoFetcher
            key={currentVideo.videoLink}
            url={currentVideo.videoLink}
            onSuccess={updateCurrentVideo}
            onFail={videoFetchFail}
          />
      )}
      {!!queueUpdate && (
        <BitchuteVideoFetcher
          key={queueUpdate.url}
          url={queueUpdate.url}
          onSuccess={queueUpdate.func}
          onFail={() => {}}
        />
      )}
      {reloadBitchute && <FeedWebView key={reloadBitchuteTimestamp} />}
      <RNView>
        <TouchableOpacity
          style={styles.tubeButton}
          onPress={() => {
            navigate('BitchuteLogin');
          }}
        >
          <View id="bitchute_logo">
            <Image
              source={bitchuteLogo}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </View>
          {bitchuteLogin ? (
            <Icon color="#0f0" name="check" type="feather" />
          ) : (
            <Icon name="log-in" type="feather" />
          )}
        </TouchableOpacity>
        <Button
          title="Logout"
          onPress={() => {
            navigate('Logouts');
          }}
        />
      </RNView>
    </RNView>
  );
}

export default memo(Drawer);
