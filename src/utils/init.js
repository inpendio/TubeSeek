import { UIManager, Platform } from 'react-native';
import {
  actionAddBitchuteLoginData,
  actionToggleLoading,
  actionBitchuteReloadAll,
  actionVideoSetVideoDb,
} from 'store';
import db, { DBhandler } from 'db';
import { getBitchuteLoginData, getQueue } from './localStorage';
import orientation from './orientation';

export default async function ({ dispatch }) {
  if (
    Platform.OS === 'android'
    && UIManager.setLayoutAnimationEnabledExperimental
  ) UIManager.setLayoutAnimationEnabledExperimental(true);

  orientation({ dispatch });
  DBhandler.setDB(db);
  DBhandler.setDispatch(dispatch);
  const queue = await getQueue();
  if (queue) DBhandler.retrieveQueue(queue);
  const loginData = await getBitchuteLoginData();
  if (loginData && loginData.key && loginData.password) {
    dispatch(actionAddBitchuteLoginData(loginData));
  }
  dispatch(actionToggleLoading());
  dispatch(actionBitchuteReloadAll());
}
