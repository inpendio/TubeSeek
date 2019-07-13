import { UIManager, Platform } from 'react-native';
import {
  actionAddBitchuteLoginData,
  actionToggleLoading,
  actionBitchuteReloadAll,
  actionVideoSetVideoDb,
} from 'store';
import db from 'db';
import { getBitchuteLoginData } from './localStorage';
import orientation from './orientation';

console.log(db);

export default async function ({ dispatch }) {
  if (
    Platform.OS === 'android'
    && UIManager.setLayoutAnimationEnabledExperimental
  ) UIManager.setLayoutAnimationEnabledExperimental(true);

  orientation({ dispatch });
  const videoDb = db.collections.get('video');
  dispatch(actionVideoSetVideoDb(videoDb));
  const loginData = await getBitchuteLoginData();
  if (loginData && loginData.key && loginData.password) {
    dispatch(actionAddBitchuteLoginData(loginData));
  }
  dispatch(actionToggleLoading());
  dispatch(actionBitchuteReloadAll());
}
