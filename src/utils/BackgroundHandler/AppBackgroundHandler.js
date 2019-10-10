import { AppState } from 'react-native';
import { actionSetBackgroundStatus } from 'store';

class AppBackgroundHandler {
  constructor() {
    this.dispatcher = () => {
      console.log(
        'dispather is missing. Please add one calling setDispatcher(dispatch)',
      );
    };
    this.currentVideo = null;
    AppState.addEventListener('change', this.handleChange);
  }

  setDispatcher = (d) => {
    this.dispatcher = d;
  };

  setCurrentlyPlaying = (data) => {
    this.currentVideo = data;
  };

  handleChange = (nextAppState) => {
    switch (nextAppState) {
      case 'active':
        this.dispatcher(actionSetBackgroundStatus(false));
        break;
      case 'background':
        this.dispatcher(actionSetBackgroundStatus(true));
        break;
      default:
        break;
    }
  };
}

export default new AppBackgroundHandler();
