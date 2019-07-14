import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Tabs, BitchuteFeedLoadMore, EmptyCard } from 'components';
import { VideoCard } from 'layouts';

function QueueScene({ navigation }) {
  const feed = useSelector(state => state.video.queue);

  return (
    <FlatList
      data={feed}
      keyExtractor={item => item.videoLink}
      renderItem={({ item }) => (
        <VideoCard
          navigation={navigation}
          item={item}
          feed={feed}
          provider="bitchute"
        />
      )}
      ListEmptyComponent={<EmptyCard />}
    />
  );
}

export default memo(QueueScene);
