import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Scene } from 'react-native-magic-move';
import { BitchuteView } from 'layouts';

function FeedScene({ navigation }) {
  const viewType = useSelector(s => s.general.view);

  const getView = () => {
    switch (viewType) {
      case 'bitchute':
        return <BitchuteView navigation={navigation} />;
      default:
        return <BitchuteView navigation={navigation} />;
    }
  };
  return <Scene>{getView()}</Scene>;
}
export default memo(FeedScene);
