import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import AuthReduser from './auth';
import PaymentReduser from './paymentReduser';

const reducers = combineReducers({ AuthReduser, PaymentReduser });

const composeEnhancers = typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(
  reducers,
  enhancer,
);

export default store;
