import { PAYMENT_LOADING, PAYMENT_CART } from '../constants/actionTypes';

const PaymentReduser = (state = { cartDetails: null, loading: false }, action) => {
  switch (action.type) {
    case PAYMENT_CART:
      return { ...state, cartDetails: action?.payload };
    case PAYMENT_LOADING:
      return { ...state, loading: action?.payload };
    default:
      return state;
  }
};

export default PaymentReduser;
