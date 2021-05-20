import { LOGIN, LOGOUT } from '../constants/actionTypes';

const AuthReduser = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authData: action?.data };
    case LOGOUT:
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default AuthReduser;
