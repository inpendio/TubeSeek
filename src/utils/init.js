import { getBitchuteLoginData } from "./localStorage";
import { actionAddBitchuteLoginData } from "store";

export default async function(store) {
  const loginData = await getBitchuteLoginData();
  if (loginData && loginData.key && loginData.password) {
    store.dispatch(actionAddBitchuteLoginData(loginData));
  }
}
