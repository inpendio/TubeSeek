import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { Loader, BitchuteSubscriptionList } from 'components';
import ChannelCard from '../../ChannelCard';

function BitchuteChannelList({ navigation: { navigate } }) {
  const [list, setList] = useState(null);
  return (
    <>
      <FlatList
        renderItem={({ item }) => <ChannelCard navigate={navigate} {...item} />}
        keyExtractor={item => item.link}
        ListEmptyComponent={<Loader />}
        data={list}
      />
      {!list && <BitchuteSubscriptionList onSuccess={data => setList(data)} />}
    </>
  );
}

export default memo(BitchuteChannelList);
