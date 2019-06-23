const ACTIONS = {
  BITCHUTE_GET_VIDEO_SOURCE: '#_bitchute_get_video_source_#',
  BITCHUTE_SET_VIDEO_SOURCE: '#_bitchute_set_video_source_#',
  CLEAN: '#_clean_video_#',
};

const initialState = {
  provider: undefined,
  link: undefined,
  linkToVideoPage: false,
  meta: undefined,
};

export default function (store = initialState, action) {
  switch (action.type) {
    case ACTIONS.BITCHUTE_GET_VIDEO_SOURCE:
      return {
        ...store,
        provider: 'bitchute',
        linkToVideoPage: action.payload.videoLink,
        link: undefined,
        meta: action.payload,
      };
    case ACTIONS.BITCHUTE_SET_VIDEO_SOURCE:
      return {
        ...store,
        provider: 'bitchute',
        link: action.payload.source,
        linkToVideoPage: false,
        meta: { ...store.meta, ...action.payload.meta },
      };
    case ACTIONS.CLEAN:
      return initialState;
    default:
      return store;
  }
}

export const actionFetchBitchuteVideoSource = payload => ({
  type: ACTIONS.BITCHUTE_GET_VIDEO_SOURCE,
  payload,
});
export const actionSetBitchuteVideoSource = payload => ({
  type: ACTIONS.BITCHUTE_SET_VIDEO_SOURCE,
  payload,
});
export const actionCleanVideo = payload => ({
  type: ACTIONS.CLEAN,
  payload,
});
