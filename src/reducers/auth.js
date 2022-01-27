import { LOGIN, LOGOUT, LOADING } from '../constants/actionTypes';

const AuthReduser = (state = { authData: null, loading: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authData: action?.data };
    case LOGOUT:
      return { ...state, authData: null };
    case LOADING:
      return { ...state, loading: action?.payload };
    default:
      return state;
  }
};

export default AuthReduser;
