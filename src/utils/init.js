import { UIManager, Platform } from 'react-native';
import {
  actionAddBitchuteLoginData,
  actionToggleLoading,
  actionBitchuteReloadAll,
} from 'store';
import { getBitchuteLoginData } from './localStorage';
import orientation from './orientation';

export default async function ({ dispatch }) {
  if (
    Platform.OS === 'android'
    && UIManager.setLayoutAnimationEnabledExperimental
  ) UIManager.setLayoutAnimationEnabledExperimental(true);

  orientation({ dispatch });
  const loginData = await getBitchuteLoginData();
  if (loginData && loginData.key && loginData.password) {
    dispatch(actionAddBitchuteLoginData(loginData));
  }
  dispatch(actionToggleLoading());
  dispatch(actionBitchuteReloadAll());
}
