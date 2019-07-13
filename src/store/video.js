import { analytics } from 'react-native-firebase';

export const ACTIONS = {
  BITCHUTE_GET_VIDEO_SOURCE: '#_bitchute_get_video_source_#',
  BITCHUTE_SET_VIDEO_SOURCE: '#_bitchute_set_video_source_#',
  CLEAN: '#_clean_video_#',
  ADD_TO_QUEUE: '#__add_to_queue__#',
  REMOVE_FROM_QUEUE: '#__remove_from_queue__#',
  SET_CURRENT_VIDEO: '#__set_current_video__#',
  UPDATE_CURRENT_VIDEO: '#__update_current_video__#',
  UPDATE_QUEUE_ITEM: '#__update_queue_item__#',
  SET_CURRENT_FETCHING: '#__set_currently_fetching__#',
  SET_VIDEO_DB: '#__set_video_db__#',
};

const initialState = {
  // provider: undefined,
  // link: undefined,
  // linkToVideoPage: false,
  // meta: undefined,
  nextVideo: undefined,
  fetchQueue: [],
  queue: [],
  currentVideo: null,
  // fetchVideo: null,
  cache: {},
  currentlyFetching: undefined,
  videoDB: null,
};

/* eslint-disable no-param-reassign */
const saveVideoToDB = async (db, video) => {
  console.log('video->db');
  try {
    const newVideo = await db.create((v) => {
      v.text = video.text;
      v.videoLink = video.videoLink;
      v.source = video.source;
      v.thumbnail = video.thumbnail;
      v.provider = video.thumbnail;
      v.magnetLink = video.magnetLink;
      v.channel = JSON.stringify(video.channel);
      v.hashtags = JSON.stringify(video.hashtags);
      v.description = JSON.stringify(video.description);
    });
    console.log('video->db', newVideo);
  } catch (error) {
    console.log('video->db->ERROR', error);
  }
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
      const queue = [...store.queue];
      const fetchQueue = [...store.fetchQueue];
      let doesExist = false;
      const item = action.payload;
      for (let i = 0; i < queue.length; i++) {
        if (queue.videoLink === item.videoLink) {
          doesExist = true;
          break;
        }
      }
      if (!doesExist) {
        if (!store.cache[item.videoLink]) {
          queue.push(item);
          if (
            !store.currentVideo
            || store.currentVideo.videoLink !== action.payload.videoLink
          ) fetchQueue.push(item.videoLink);
        } else {
          queue.push(store.cache[item.videoLink]);
        }
      }
      return {
        ...store,
        queue,
        fetchQueue,
      };
    }
    case ACTIONS.REMOVE_FROM_QUEUE: {
      const queue = [...store.queue];
      const item = action.payload;
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].videoLink === item.videoLink) {
          queue.splice(i, 1);
          break;
        }
      }
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
    case ACTIONS.UPDATE_CURRENT_VIDEO: {
      const cache = { ...store.cache };
      const newVideo = {
        ...store.currentVideo,
        ...action.payload,
      };
      cache[store.currentVideo.videoLink] = newVideo;
      saveVideoToDB(store.videoDB, newVideo);
      return {
        ...store,
        currentVideo: newVideo,
        cache,
      };
    }
    case ACTIONS.UPDATE_QUEUE_ITEM: {
      const queue = [...store.queue];
      const fetchQueue = [...store.fetchQueue];
      const item = action.payload;
      const cache = { ...store.cache };

      for (let i = 0; i < queue.length; i++) {
        if (queue[i].videoLink === item.videoLink) {
          const newItem = { ...queue[i], ...item };
          cache[queue[i].videoLink] = newItem;
          queue[i] = newItem;
          saveVideoToDB(store.videoDB, newItem);
          fetchQueue.splice(fetchQueue.indexOf(item.videoLink), 1);
          break;
        }
      }
      return {
        ...store,
        queue,
        fetchQueue,
        cache,
      };
    }
    case ACTIONS.SET_VIDEO_DB:
      return { ...store, videoDB: action.payload };
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
export const actionBitchuteAddToQueue = payload => ({
  type: ACTIONS.ADD_TO_QUEUE,
  payload,
});
export const actionBitchuteRemoveToQueue = payload => ({
  type: ACTIONS.REMOVE_FROM_QUEUE,
  payload,
});
export const actionVideoSetCurrentVideo = payload => ({
  type: ACTIONS.SET_CURRENT_VIDEO,
  payload,
});

export const actionVideoUpdateCurrentVideo = payload => ({
  type: ACTIONS.UPDATE_CURRENT_VIDEO,
  payload,
});
export const actionVideoUpdateQueueItem = payload => ({
  type: ACTIONS.UPDATE_QUEUE_ITEM,
  payload,
});
export const actionVideoSetCurrentlyFetching = payload => ({
  type: ACTIONS.SET_CURRENT_FETCHING,
  payload,
});
export const actionVideoSetVideoDb = payload => ({
  type: ACTIONS.SET_VIDEO_DB,
  payload,
});
