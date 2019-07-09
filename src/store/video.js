import { analytics } from 'react-native-firebase';

export const ACTIONS = {
  BITCHUTE_GET_VIDEO_SOURCE: '#_bitchute_get_video_source_#',
  BITCHUTE_SET_VIDEO_SOURCE: '#_bitchute_set_video_source_#',
  CLEAN: '#_clean_video_#',
  ADD_TO_QUEUE: '#__add_to_queue__#',
  REMOVE_FROM_QUEUE: '#__remove_from_queue__#',
  SET_CURRENT_VIDEO: '#__set_current_video__#',
  UPDATE_CURRENT_VIDEO: '#__update_current_video__#',
};

const initialState = {
  provider: undefined,
  link: undefined,
  linkToVideoPage: false,
  meta: undefined,
  nextVideo: undefined,
  queue: [],
  currentVideo: null,
  fetchVideo: null,
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
      analytics().logEvent('video_view', {
        videoName: store.meta.text,
        channel: store.meta.channel,
        videoLink: action.payload.source,
      });
      return {
        ...store,
        provider: 'bitchute',
        link: action.payload.source,
        linkToVideoPage: false,
        meta: { ...store.meta, ...action.payload.meta },
      };
    case ACTIONS.CLEAN:
      return { ...store, currentVideo: null };
    case ACTIONS.ADD_TO_QUEUE: {
      const { queue } = store;
      if (queue.indexOf(action.item.videoLink) === -1) queue.push(action.item.videoLink);
      return {
        ...store,
        queue,
      };
    }
    case ACTIONS.REMOVE_FROM_QUEUE: {
      const { queue } = store;
      if (queue.indexOf(action.item.videoLink) !== -1) queue.splice(queue.indexOf(action.item.videoLink), 1);
      return {
        ...store,
        queue,
      };
    }
    case ACTIONS.SET_CURRENT_VIDEO:
      return {
        ...store,
        currentVideo: action.payload,
      };
    case ACTIONS.UPDATE_CURRENT_VIDEO:
      return {
        ...store,
        currentVideo: { ...store.currentVideo, ...action.payload },
      };
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
export const actionBitchuteAddToQueue = ({ item, feed }) => ({
  type: ACTIONS.ADD_TO_QUEUE,
  feed,
  item,
});
export const actionBitchuteRemoveToQueue = ({ item, feed }) => ({
  type: ACTIONS.REMOVE_FROM_QUEUE,
  feed,
  item,
});
export const actionVideoSetCurrentVideo = payload => ({
  type: ACTIONS.SET_CURRENT_VIDEO,
  payload,
});

export const actionVideoUpdateCurrentVideo = payload => ({
  type: ACTIONS.UPDATE_CURRENT_VIDEO,
  payload,
});
