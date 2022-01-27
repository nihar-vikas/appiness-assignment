import { message } from 'antd';
import API from './apis';

const getToken = JSON.parse(localStorage.getItem('profile'));

function isDate(val) {
  // Cross realm comptatible
  return Object.prototype.toString.call(val) === '[object Date]';
}

function isObj(val) {
  return typeof val === 'object';
}

function stringifyValue(val) {
  if (isObj(val) && !isDate(val)) {
    return JSON.stringify(val);
  }
  return val;
}

function buildForm({ action, params }) {
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', action);

  Object.keys(params).forEach((key) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', stringifyValue(params[key]));
    form.appendChild(input);
  });

  return form;
}

function post(details) {
  const form = buildForm(details);
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

const getData = (data) => fetch(API.PAYMENT_API, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken?.token}`,
  },
  body: JSON.stringify(data),
  // eslint-disable-next-line no-console
}).then((response) => response.json()).catch((error) => console.log(error));

const makePayment = (amount, email) => {
  // console.log(getToken?.token, 'dddd');
  if (getToken?.token) {
    getData({ amount, email }).then((response) => {
      const information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response,
      };
      post(information);
    });
  } else {
    message.error('Please Login First');
  }
};
export default makePayment;
