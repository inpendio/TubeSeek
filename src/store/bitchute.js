import { setBitchuteLoginData } from 'utils';

export const ACTIONS = {
  ADD_LOGIN_DATA: '(.)add_login_data(.)',
  BITCHUTE_LOGOUT: '(.)bitchute_logout(.)',
  BITCHUTE_LOGIN: '(.)bitchute_login(.)',
  BITCHUTE_ADD_FEED_SUBSCRIBED: '(.)bitchute_add_feed_subscribed(.)',
  BITCHUTE_ADD_FEED_ALL: '(.)bitchute_add_feed_all(.)',
  BITCHUTE_ADD_FEED_TRENDING: '(.)bitchute_add_feed_trending(.)',
  BITCHUTE_ADD_FEED_POPULAR: '(.)bitchute_add_feed_popular(.)',
  BITCHUTE_RELOAD_ALL: '(.)bitchute_reload_all(.)',
};

const initialStore = {
  loggedIn: false,
  loginData: { key: '', password: '' },
  feed: {
    void: [],
    popular: [],
    subscribed: [],
    trendingDay: [],
    trendingWeek: [],
    trendingMonth: [],
    all: [],
  },
  reloadAll: false,
};

export default function (store = initialStore, action) {
  switch (action.type) {
    case ACTIONS.ADD_LOGIN_DATA: {
      const data = action.payload;
      if (data.key && data.password) {
        setBitchuteLoginData(data);
        return {
          ...store,
          loggedIn: true,
          loginData: data,
        };
      }
      return store;
    }
    case ACTIONS.BITCHUTE_LOGOUT:
      return {
        ...store,
        loggedIn: false,
      };
    case ACTIONS.BITCHUTE_LOGIN:
      return {
        ...store,
        loggedIn: true,
      };
    case ACTIONS.BITCHUTE_ADD_FEED_SUBSCRIBED: {
      const newStore = { ...store };
      newStore.feed.subscribed = action.payload;
      return newStore;
    }
    case ACTIONS.BITCHUTE_ADD_FEED_ALL: {
      const newStore = { ...store };
      newStore.feed.all = action.payload;
      return newStore;
    }
    case ACTIONS.BITCHUTE_ADD_FEED_POPULAR: {
      const newStore = { ...store };
      newStore.feed.popular = action.payload;
      return newStore;
    }
    case ACTIONS.BITCHUTE_ADD_FEED_TRENDING: {
      const newStore = { ...store };
      newStore.feed.trendingDay = action.payload.trendingDay;
      newStore.feed.trendingWeek = action.payload.trendingWeek;
      newStore.feed.trendingMonth = action.payload.trendingMonth;
      return newStore;
    }
    case ACTIONS.BITCHUTE_RELOAD_ALL:
      return { ...store, reloadAll: !store.reloadAll };
    default:
      return store;
  }
}

export const actionAddBitchuteLoginData = data => ({
  payload: data,
  type: ACTIONS.ADD_LOGIN_DATA,
});

export const actionBitchuteLogOut = () => ({
  type: ACTIONS.BITCHUTE_LOGOUT,
});
export const actionBitchuteLogIn = () => ({
  type: ACTIONS.BITCHUTE_LOGIN,
});
export const actionBitchuteAddSubsribeFeed = list => ({
  type: ACTIONS.BITCHUTE_ADD_FEED_SUBSCRIBED,
  payload: list,
});
export const actionBitchuteAddPopularFeed = list => ({
  type: ACTIONS.BITCHUTE_ADD_FEED_POPULAR,
  payload: list,
});
export const actionBitchuteAddAllFeed = list => ({
  type: ACTIONS.BITCHUTE_ADD_FEED_ALL,
  payload: list,
});
export const actionBitchuteAddTrendingFeed = list => ({
  type: ACTIONS.BITCHUTE_ADD_FEED_TRENDING,
  payload: list,
});
export const actionBitchuteReloadAll = () => ({
  type: ACTIONS.BITCHUTE_RELOAD_ALL,
});
