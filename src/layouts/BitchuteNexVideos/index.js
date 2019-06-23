import React, { useState, memo } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Tabs } from 'components';
import VideoCard from '../VideoCard';

import { TABS, FEEDS } from './constants';

function BitchuteNextVideos({ navigation, current }) {
  const [tab, setTab] = useState(0);
  let feed = useSelector(state => state.bitchute.feed[FEEDS[tab]]);
  if (current) feed = feed.filter(f => f.videoLink !== current.videoLink);
  return (
    <View style={{ marginTop: 20 }}>
      <Tabs tabs={TABS} onChange={setTab} index={tab} />
      <FlatList
        data={feed}
        keyExtractor={item => item.videoLink}
        renderItem={({ item }) => (
          <VideoCard navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}

export default memo(BitchuteNextVideos);
