import { message } from 'antd';
import API from '../services/apis';
import { PAYMENT_LOADING, PAYMENT_CART } from '../constants/actionTypes';

export const updatePaymentDetails = (data, id) => async (dispatch) => {
  const getToken = JSON.parse(localStorage.getItem('profile'));
  dispatch({ type: PAYMENT_LOADING, payload: true });
  try {
    const response = await fetch(`${API.UPDATE_PAYMENT_DETAILS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken?.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result?.status === 200) {
      message.success(result?.message);
    } else {
      message.error(result?.message);
    }
  } catch (err) {
    message.error(err?.message);
  } finally {
    dispatch({ type: PAYMENT_LOADING, payload: false });
  }
};

export const CartDetails = (data) => async (dispatch) => {
  dispatch({ type: PAYMENT_CART, payload: data });
};
