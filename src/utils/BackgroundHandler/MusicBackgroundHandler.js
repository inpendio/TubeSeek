import MusicControl from 'react-native-music-control';
import { actionPlayVideo, actionPauseVideo, actionVideoPlayNext } from 'store';

class MusicBackgroundHandler {
  constructor() {
    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('closeNotification', true, { when: 'always' });
    MusicControl.on('play', () => {
      this.dispatcher(actionPlayVideo());
    });

    // on iOS this event will also be triggered by audio router change events
    // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    MusicControl.on('pause', () => {
      this.dispatcher(actionPauseVideo());
    });

    MusicControl.on('stop', () => {
      this.dispatcher(actionPauseVideo());
    });

    MusicControl.on('nextTrack', () => {
      this.dispatcher(actionVideoPlayNext());
    });
    // MusicControl.resetNowPlaying();
    // MusicControl.stopControl();
  }

  setDispatcher = (d) => {
    this.dispatcher = d;
  };

  setNowPlaying = ({
    text: title,
    thumbnail: artwork,
    channel: { name: artist },
    duration,
  }) => {
    MusicControl.setNowPlaying({
      title,
      artwork,
      artist,
      duration: duration
        ? duration
          .split(':')
          .reverse()
          .reduce((a, v, i) => {
            const factor = 60 ** i;
            return a + v * factor;
          }, 0)
        : 1000,
    });
  };

  updatePlayback = ({ paused }) => {
    MusicControl.updatePlayback({
      state: paused ? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      speed: 1, // Playback Rate
    });
  };

  reset = () => {
    MusicControl.resetNowPlaying();
  };
}

export default new MusicBackgroundHandler();
