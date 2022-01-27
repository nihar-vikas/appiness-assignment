/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { message } from 'antd';
import API from '../services/apis';
import { LOGIN, LOGOUT, LOADING } from '../constants/actionTypes';

const PAYTM_GET_TOKEN_API = 'https://accounts.paytm.com/oauth2/v2/token';
const PAYTM_GET_USER_DETAILS_API = 'https://accounts.paytm.com/v2/user?fetch_strategy=profile_info,phone_number,email';
const PATYM_CLIENT_ID = '1b1c662f023b4eb3ab31561a73598957';
const PAYTM_AUTH_TOKEN = `Basic ${btoa(`${PATYM_CLIENT_ID}:client-secret`)}`;

export const loginFunction = (data, callback) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetch(API.USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result?.status === 201) {
      message.success(result?.message);
      window.localStorage.setItem('profile', JSON.stringify({ userLogin: true, ...result }));
      dispatch({ type: LOGIN, data: { userLogin: true, ...result } || [] });
      callback();
    } else {
      message.error(result?.message);
    }
  } catch (err) {
    message.error(err?.message);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const getUserDetails = (patymTok, callBack) => async (dispatch) => {
  const otherParams = {
    headers: {
      verification_type: 'oauth_token',
      data: patymTok?.access_token,
      Authorization: PAYTM_AUTH_TOKEN,
    },
    method: 'GET',
  };
  fetch(PAYTM_GET_USER_DETAILS_API, otherParams)
    .then((res) => res.json())
    .then((res) => {
      const Data = {
        email: res?.email,
        password: `Appiness@${res?.phoneInfo?.phoneNumber}`,
        firstName: res?.profileInfo?.displayName,
        phoneNo: res?.phoneInfo?.phoneNumber,
        countryCode: res?.phoneInfo?.countryCode,
        loginType: 'paytm',
      };
      dispatch(loginFunction(Data, callBack));
    })
    .catch((err) => console.log(err));
};

export const getPaytmToken = (info, callBack) => async (dispatch) => {
  const data = {
    grant_type: 'authorization_code',
    code: info?.data?.authId,
    client_id: PATYM_CLIENT_ID,
    scope: 'basic',
  };
  const formBody = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  const requestBody = formBody.join('&');
  const otherParams = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: PAYTM_AUTH_TOKEN,
    },
    body: requestBody,
    method: 'POST',
  };
  fetch(PAYTM_GET_TOKEN_API, otherParams)
    .then((res) => res.json())
    .then((res) => { dispatch(getUserDetails(res, callBack)); })
    .catch((err) => { console.log(err); message.error('internal server error'); });
};

export const paytmLogin = (callBack) => async (dispatch) => {
  function ready(callback) {
    if (window.JSBridge && callback) {
      callback();
    } else {
      document.addEventListener('JSBridgeReady', callback, false);
    }
  }
  ready(() => {
    window.JSBridge.call('paytmFetchAuthCode', {
      clientId: PATYM_CLIENT_ID,
    }, (result) => {
      dispatch(getPaytmToken(result, callBack));
    });
  });
};

const isUserinPaytmMini = () => {
  const ua = window.navigator.userAgent;
  return /AppContainer/i.test(ua);
};

export const UserLogIn = (type, Data, callback) => async (dispatch) => {
  if (isUserinPaytmMini()) {
    dispatch(paytmLogin(callback));
  } else if (type === 'login') {
    dispatch(loginFunction(Data, callback));
  } else {
    Data.push('/login');
    message.error('Please Login');
  }
};

export const userRegister = (data, callback) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await fetch(API.USER_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result?.status === 201) {
      message.success(result?.message);
      callback();
    } else {
      message.error(result?.message);
    }
  } catch (error) {
    message.error(error?.message);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const UserLogOut = () => async (dispatch) => {
  window.localStorage.removeItem('profile');
  dispatch({ type: LOGOUT, data: { userLogin: false, setLogOut: true } || [] });
};
