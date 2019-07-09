import React, { memo, useState, useEffect } from 'react';
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
import { actionVideoUpdateCurrentVideo } from 'store';

import styles from './styles';

function Drawer(props) {
  const {
    navigation: { navigate },
  } = props;
  const dispatch = useDispatch();
  const bitchuteLogin = useSelector(state => state.bitchute.loggedIn);
  const reloadBitchute = useSelector(state => state.bitchute.reloadAll);
  const currentVideo = useSelector(s => s.video.currentVideo);
  // const bitchuteVideoFetch = useSelector(s => s.video.linkToVideoPage);

  // const bitchuteSearch = useSelector(s => s.bitchute.search);

  // if(bitchuteSearch.search)navigate("")

  const updateCurrentVideo = (data) => {
    dispatch(actionVideoUpdateCurrentVideo(data));
  };

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
        </RNView>
      </RNView>
      {!!currentVideo && !currentVideo.source && !!currentVideo.videoLink && (
        <BitchuteVideoFetcher
          url={currentVideo.videoLink}
          onSuccess={updateCurrentVideo}
        />
      )}
      {reloadBitchute && <FeedWebView />}
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
