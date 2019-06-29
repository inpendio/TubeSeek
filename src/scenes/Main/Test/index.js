import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Scene } from 'react-native-magic-move';
import { TestView } from 'components';

function Test({ navigation }) {
  return (
    <Scene>
      <TestView />
    </Scene>
  );
}
export default memo(Test);
