import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import bitchute from './bitchute';
import general from './general';

const middleware = [];

const rootReducer = combineReducers({
  bitchute,
  general,
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
} from './bitchute';
