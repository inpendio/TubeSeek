import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { View as RNView, Keyboard, FlatList } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { analytics } from 'react-native-firebase';
import { Scene } from 'react-native-magic-move';
import { colors } from 'config';
import { BitchuteSearch, Loader } from 'components';
import { VideoCard } from 'layouts';

function SearchScene({ navigation }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const searchResults = useSelector(s => s.bitchute.search.results);
  const doSearch = () => {
    setPage(1);
    Keyboard.dismiss();
    analytics().logEvent('search_bitchute', {
      string: search,
    });
  };
  return (
    <Scene>
      <RNView style={{ flex: 1 }}>
        <RNView style={{ marginBottom: 20 }}>
          <Input
            placeholder=""
            returnKeyType="go"
            rightIcon={(
              <Icon
                name="arrow-right"
                type="feather"
                size={24}
                color={colors.black}
                style={{ padding: 5 }}
                onPress={doSearch}
              />
)}
            onSubmitEditing={doSearch}
            onChangeText={(e) => {
              setSearch(e);
            }}
          />
        </RNView>
        <RNView style={{ paddingBottom: 30 }}>
          <FlatList
            data={searchResults}
            keyExtractor={(item, i) => `${item.videoLink}_${i + 1}`}
            renderItem={({ item }) => (
              <VideoCard navigation={navigation} item={item} />
            )}
            onEndReached={() => {
              setPage(page + 1);
            }}

            /* ListFooterComponent={<RNView style={{ justifyContent: 'center', alignContent: 'center' }}>{page && <Loader />}</RNView>} */
          />
        </RNView>
      </RNView>
      {!!page && <BitchuteSearch page={page} search={search} />}
    </Scene>
  );
}
export default memo(SearchScene);
