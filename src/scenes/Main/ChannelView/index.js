import React, { memo } from 'react';
import { Scene } from 'react-native-magic-move';
import { BitchuteChannel } from 'layouts';
import { EmptyCard } from 'components';

const NOT_FOUND = `Something is wrong.
We cannot find this channel...`;

function ChannelView({ navigation }) {
  const {
    state: {
      params: { url },
    },
  } = navigation;
  console.log(navigation);
  const getView = () => {
    if (url.indexOf('bitchute') !== -1) return <BitchuteChannel navigation={navigation} />;
    return <EmptyCard text={NOT_FOUND} />;
  };
  return <Scene>{getView()}</Scene>;
}
export default memo(ChannelView);
