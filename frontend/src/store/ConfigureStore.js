import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/LoginAction.js';
import promiseMiddleware from '../middleware/PromiseMiddleware.js';

export default function ConfigureStore(initialState) {
  const enhancer = compose(applyMiddleware(promiseMiddleware));
  return createStore(reducer, initialState, enhancer);
}
