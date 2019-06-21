const initialStore = {
  viewType: 'list', // [list,grid]
};

export default function (store = initialStore, action) {
  switch (action.type) {
    default:
      return store;
  }
}
