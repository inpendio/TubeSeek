import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import bitchute from './bitchute';
import general from './general';
import video from './video';

const middleware = [];

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
  actionBitchuteAddToQueue,
  actionBitchuteRemoveToQueue,
} from './bitchute';

export { actionToggleLoading, addOrientationData } from './general';

export {
  actionFetchBitchuteVideoSource,
  actionSetBitchuteVideoSource,
  actionCleanVideo,
} from './video';
