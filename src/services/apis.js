// const HOSTNAME = 'localhost';
// const PORT = '5000';
// const PROTO = 'http';
// const LOCALBASE = `${PROTO}://${HOSTNAME}:${PORT}/api`;
const PRODBASE = 'https://patym-mini-app.herokuapp.com/api';

const API = {
  PAYMENT_API: `${PRODBASE}/payment/payment`,
  USER_REGISTER: `${PRODBASE}/users/register`,
  USER_LOGIN: `${PRODBASE}/auth/login`,
  UPDATE_PAYMENT_DETAILS: `${PRODBASE}/payment/paymentUpdate`,
};

export default API;
