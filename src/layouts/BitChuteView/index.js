import React, { useState, memo } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Tabs } from 'components';
import VideoCard from '../VideoCard';
import EmptyCard from '../EmptyCard';

import { TABS, FEEDS } from './constants';

function BitchuteView({ navigation }) {
  const [tab, setTab] = useState(0);
  const feed = useSelector(state => state.bitchute.feed[FEEDS[tab]]);
  return (
    <ScrollView>
      <Tabs tabs={TABS} onChange={setTab} index={tab} />
      <FlatList
        data={feed}
        keyExtractor={item => item.videoLink}
        renderItem={({ item }) => (
          <VideoCard navigation={navigation} item={item} />
        )}
        ListEmptyComponent={<EmptyCard />}
      />
    </ScrollView>
  );
}

export default memo(BitchuteView);
