const initialStore = {
  viewType: 'list', // [list,grid]
  loading: false,
  view: 'bitchute',
  orinetation: false,
  dimensions: {},
};

const ACTIONS = {
  TOGGLE_LOADING: '(_!_)loading(_!_)',
  ADD_ORIENTATION_DATA: '(_!_)orientation(_!_)',
};

export default function (store = initialStore, action) {
  switch (action.type) {
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
