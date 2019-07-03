import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Tabs, BitchuteFeedLoadMore, EmptyCard } from 'components';
import VideoCard from '../../VideoCard';

import { TABS, FEEDS } from './constants';

function BitchuteView({ navigation }) {
  const [tab, setTab] = useState(0);
  const [loadMore, setLoadMore] = useState(null);
  const feed = useSelector(state => state.bitchute.feed[FEEDS[tab]]);
  return (
    <>
      <FlatList
        data={feed}
        ListHeaderComponent={<Tabs tabs={TABS} onChange={setTab} index={tab} />}
        keyExtractor={item => item.videoLink}
        renderItem={({ item }) => (
          <VideoCard
            navigation={navigation}
            item={item}
            feed={FEEDS[tab]}
            provider="bitchute"
          />
        )}
        ListEmptyComponent={<EmptyCard />}
        onEndReached={() => {
          if (tab < 3) {
            setLoadMore({
              offset: feed.length,
              name: FEEDS[tab],
              last: feed[feed.length - 1].videoLink
                .replace('https://www.bitchute.com/video/', '')
                .replace('/', '')
                .trim(),
            });
          }
        }}
      />
      {!!loadMore && (
        <BitchuteFeedLoadMore
          {...loadMore}
          onSuccess={() => {
            setLoadMore(null);
          }}
        />
      )}
    </>
  );
}

export default memo(BitchuteView);
