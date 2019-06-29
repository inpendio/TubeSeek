import React, { useState, memo } from 'react';
import { FlatList, View } from 'react-native';
import {
  Loader,
  BitchuteChannelPage,
  Accordion,
  Text,
  BitchuteSub,
  BitchuteChanelVideosLoadMore,
  Button,
} from 'components';
import { Avatar, Icon } from 'react-native-elements';
import VideoCard from '../VideoCard';

function BitchuteChannel({ navigation }) {
  const {
    state: {
      params: { url },
    },
  } = navigation;
  const [list, setList] = useState(null);
  const [info, setInfo] = useState(null);
  const [subscibed, setSubscribed] = useState(false);
  const [toggleSub, setToggleSub] = useState(false);
  const [loadMore, setLoadMore] = useState(0);
  console.log(subscibed, toggleSub);

  const renderAbout = () => (
    <View>
      {!!info && !!info.name && (
        <Text center h2 primary>
          {info.name}
        </Text>
      )}
      <Accordion
        title="About"
        titleTextProps={{ b: true }}
        titleStyle={{ paddingHorizontal: 20 }}
      >
        {info ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar
                size="large"
                source={info.thumbnail ? { uri: info.thumbnail } : {}}
              />

              <Button
                type={subscibed ? 'outline' : 'solid'}
                title={subscibed ? 'Unsubscribe' : 'Subscribe'}
                onPress={() => {
                  setToggleSub(true);
                }}
                loading={toggleSub}
              />
            </View>
            <View>
              <Text body3>{info.description}</Text>
              <Text body3>{`Created: ${info.timeCreated}`}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="people" />
                <Text body3 style={{ marginLeft: 5 }}>
                  {info.subscribers}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="visibility" />
                <Text body3 style={{ marginLeft: 5 }}>
                  {info.totalViews}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="movie" />
                <Text body3 style={{ marginLeft: 5 }}>
                  {info.totalVideos}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </Accordion>
    </View>
  );

  return (
    <>
      <FlatList
        renderItem={({ item }) => (
          <VideoCard navigation={navigation} item={item} />
        )}
        keyExtractor={item => item.videoLink}
        ListEmptyComponent={<Loader />}
        data={list}
        ListHeaderComponent={renderAbout()}
        onEndReached={() => setLoadMore(list.length)}
        style={{ paddingVertical: 20 }}
      />
      {!list && (
        <BitchuteChannelPage
          url={url}
          onSuccess={(data) => {
            const {
              channelInfo: { subscribed: sub, ...other },
              videoList,
            } = data;
            setInfo(other);
            setList(videoList);
            setSubscribed(sub);
          }}
        />
      )}
      {!!toggleSub && (
        <BitchuteSub
          url={url}
          onSuccess={(data) => {
            console.log(data);
            setToggleSub(false);
            setSubscribed(data.state === 'Subscribed');
          }}
        />
      )}
      {!!loadMore && (
        <BitchuteChanelVideosLoadMore
          url={url}
          offset={loadMore}
          onSuccess={({ data }) => {
            setLoadMore(0);
            setList([...list, ...data]);
          }}
        />
      )}
    </>
  );
}

export default memo(BitchuteChannel);
