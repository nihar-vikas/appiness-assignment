import { message } from 'antd';
import { LOGIN, LOGOUT } from '../constants/actionTypes';

export const UserLogIn = (Data) => async (dispatch) => {
  if (Data) {
    if (Data.username !== 'hruday@gmail.com') {
      message.error('Invalid User Name');
    } else if (Data.password !== 'hruday123') {
      message.error('Invalid Password');
    } else {
      window.localStorage.setItem('profile', JSON.stringify({ userLogin: true, ...Data }));
      dispatch({ type: LOGIN, data: { userLogin: true, ...Data } || [] });
    }
  }
};

export const UserLogOut = () => async (dispatch) => {
  window.localStorage.removeItem('profile');
  dispatch({ type: LOGOUT, data: { userLogin: false, setLogOut: true } || [] });
};
