import React, { memo } from 'react';

import { Provider } from 'react-native-magic-move';
import { Provider as ReduxProvider } from 'react-redux';
import Scenes from 'scenes';
import store from 'store';
import { init } from 'utils';

function App() {
  init(store);
  return (
    <ReduxProvider store={store}>
      {/* <VideoModal /> */}
      <Provider>
        <Scenes />
      </Provider>
    </ReduxProvider>
  );
}
export default memo(App);
