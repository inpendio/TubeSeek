import { MusicBackgroundHandler } from 'utils';
import { ACTIONS as GENERAL_ACTIONS } from './general';
import { ACTIONS as VIDEO_ACTIONS } from './video';

export default store => next => (action) => {
  switch (action.type) {
    case VIDEO_ACTIONS.CURRENT_PAUSE_VIDEO:
      MusicBackgroundHandler.updatePlayback({ paused: true });
      next(action);
      break;
    case VIDEO_ACTIONS.CURRENT_PLAY_VIDEO:
      MusicBackgroundHandler.updatePlayback({ paused: false });
      next(action);
      break;
    case GENERAL_ACTIONS.SET_BACKGROUND_STATUS: {
      const {
        video: { currentVideo },
      } = store.getState();
      if (action.payload && currentVideo) {
        MusicBackgroundHandler.setNowPlaying(currentVideo);
        MusicBackgroundHandler.updatePlayback(currentVideo);
      } else {
        MusicBackgroundHandler.reset();
      }
      next(action);
      break;
    }
    case VIDEO_ACTIONS.PLAY_NEXT: {
      const {
        video: { queue, currentVideo },
      } = store.getState();
      if (queue[0]) {
        MusicBackgroundHandler.setNowPlaying(queue[0]);
        MusicBackgroundHandler.updatePlayback(currentVideo);
      }
      next(action);
      break;
    }
    default:
      next(action);
  }
};
