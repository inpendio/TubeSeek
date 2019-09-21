import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import bitchute from './bitchute';
import general from './general';
import video from './video';
import MusicMiddlewere from './BackgroundControlsMiddlewere';

const middleware = [MusicMiddlewere];

const rootReducer = combineReducers({
  bitchute,
  general,
  video,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export {
  actionAddBitchuteLoginData,
  actionBitchuteAddSubsribeFeed,
  actionBitchuteLogOut,
  actionBitchuteLogIn,
  actionBitchuteAddPopularFeed,
  actionBitchuteAddAllFeed,
  actionBitchuteAddTrendingFeed,
  actionBitchuteReloadAll,
  actionAppendSearchResults,
  actionCleanSearchResults,
  actionBitchuteAppendToFeed,
} from './bitchute';

export {
  actionToggleLoading,
  addOrientationData,
  addNavigation,
  actionSetBackgroundStatus,
} from './general';

export {
  actionFetchBitchuteVideoSource,
  actionSetBitchuteVideoSource,
  actionCleanVideo,
  actionBitchuteAddToQueue,
  actionBitchuteRemoveToQueue,
  actionVideoSetCurrentVideo,
  actionVideoUpdateCurrentVideo,
  actionVideoUpdateQueueItem,
  actionVideoSetCurrentlyFetching,
  actionVideoSetVideoDb,
  actionVideoAddToCache,
  actionVideoPlayNext,
  actionToggleCurrentVideoPause,
  actionPlayVideo,
  actionPauseVideo,
} from './video';
