import AsyncStorage from '@react-native-community/async-storage';

const BITCHUTE_SESSION_COOKIE = 'bitchute_session_cookie';
const BITCHUTE_LOGIN_DATA = 'bitchute_login_data';

export const getBitchuteSessionCookie = async () => {
  try {
    const res = await AsyncStorage.getItem(BITCHUTE_SESSION_COOKIE);
    return JSON.parse(res);
  } catch (error) {
    console.log('ERROR@getBitchuteSessionCookie', error);
    return null;
  }
};

export const setBitchuteSessionCookie = async (cookie) => {
  try {
    await AsyncStorage.setItem(BITCHUTE_SESSION_COOKIE, cookie);
  } catch (error) {
    console.log('ERROR@setBitchuteSessionCookie', error);
  }
};

export const removeBitchuteSessionCookie = async () => {
  try {
    await AsyncStorage.removeItem(BITCHUTE_SESSION_COOKIE);
  } catch (error) {
    console.log('ERROR@removeBitchuteSessionCookie', error);
  }
};

export const getBitchuteLoginData = async () => {
  try {
    const res = await AsyncStorage.getItem(BITCHUTE_LOGIN_DATA);
    return JSON.parse(res);
  } catch (error) {
    console.log('ERROR@getBitchuteLoginData', error);
    return null;
  }
};

export const setBitchuteLoginData = async (data) => {
  try {
    await AsyncStorage.setItem(BITCHUTE_LOGIN_DATA, JSON.stringify(data));
  } catch (error) {
    console.log('ERROR@setBitchuteLoginData', error);
  }
};

export const removeBitchuteLoginData = async () => {
  try {
    await AsyncStorage.removeItem(BITCHUTE_LOGIN_DATA);
  } catch (error) {
    console.log('ERROR@removeBitchuteLoginData', error);
  }
};
