import {
  actionAddBitchuteLoginData,
  actionToggleLoading,
  actionBitchuteReloadAll,
} from 'store';
import { getBitchuteLoginData } from './localStorage';
import orientation from './orientation';

export default async function ({ dispatch }) {
  orientation({ dispatch });
  const loginData = await getBitchuteLoginData();
  if (loginData && loginData.key && loginData.password) {
    dispatch(actionAddBitchuteLoginData(loginData));
  }
  dispatch(actionToggleLoading());
  dispatch(actionBitchuteReloadAll());
}
