import React, { memo } from 'react';
import { Scene } from 'react-native-magic-move';
import { Logouts } from 'layouts';

function LogoutsScene() {
  return (
    <Scene>
      <Logouts />
    </Scene>
  );
}
export default memo(LogoutsScene);
