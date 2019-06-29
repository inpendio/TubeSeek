import React, { memo } from 'react';
import { Scene } from 'react-native-magic-move';
import { BitchuteChannel } from 'layouts';

function BitchuteChannelView({ navigation }) {
  return (
    <Scene>
      <BitchuteChannel navigation={navigation} />
    </Scene>
  );
}
export default memo(BitchuteChannelView);
