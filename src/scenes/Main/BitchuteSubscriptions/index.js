import React, { memo } from 'react';
import { Scene } from 'react-native-magic-move';
import { BitchuteChannelList } from 'layouts';

function BitchuteSubscriptions({ navigation }) {
  return (
    <Scene>
      <BitchuteChannelList navigation={navigation} />
    </Scene>
  );
}
export default memo(BitchuteSubscriptions);
