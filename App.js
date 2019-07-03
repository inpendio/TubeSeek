import React, { memo } from 'react';

import { Provider } from 'react-native-magic-move';
import { Provider as ReduxProvider } from 'react-redux';
import { VideoModal } from 'components';
import Scenes from 'scenes';
import store from 'store';
import {
  init /* bitchuteLogin, parseBasicList, bitchuteHomePage, */,
} from 'utils';

/* async function test() {
  const html = await bitchuteHomePage();

  const data = parseBasicList(html);
  console.log(data);
} */

function App() {
  init(store);
  // getBasic();
  // loginHtml();
  // bitchuteLogin();
  // test();
  // parseLoginToken();
  return (
    <ReduxProvider store={store}>
      <Provider>
        <VideoModal />
        <Scenes />
      </Provider>
    </ReduxProvider>
  );
}
export default memo(App);
