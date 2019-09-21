const initialStore = {
  viewType: 'list', // [list,grid]
  loading: false,
  view: 'bitchute',
  orinetation: false,
  dimensions: {},
  navigation: null,
  isInBackground: false,
  theme: '',
};

export const ACTIONS = {
  TOGGLE_LOADING: '(_!_)loading(_!_)',
  ADD_ORIENTATION_DATA: '(_!_)orientation(_!_)',
  ADD_NAVIGATION: '(_!_)add_navigation(_!_)',
  SET_BACKGROUND_STATUS: '(_!_)set_background_status(_!_)',
};

export default function (store = initialStore, action) {
  switch (action.type) {
    case ACTIONS.SET_BACKGROUND_STATUS:
      return { ...store, isInBackground: action.payload };
    case ACTIONS.TOGGLE_LOADING:
      return { ...store, loading: !store.loading };
    case ACTIONS.ADD_ORIENTATION_DATA: {
      const { orinetation, ...other } = action.payload;
      return {
        ...store,
        orinetation,
        dimensions: other,
      };
    }
    case ACTIONS.ADD_NAVIGATION:
      return { ...store, navigation: action.payload };
    default:
      return store;
  }
}

export const actionToggleLoading = () => ({
  type: ACTIONS.TOGGLE_LOADING,
});
export const addOrientationData = payload => ({
  type: ACTIONS.ADD_ORIENTATION_DATA,
  payload,
});
export const addNavigation = payload => ({
  type: ACTIONS.ADD_NAVIGATION,
  payload,
});
export const actionSetBackgroundStatus = (payload, musicPlayer) => ({
  type: ACTIONS.SET_BACKGROUND_STATUS,
  payload,
  musicPlayer,
});
