import React from 'react';
import ReactDOM from 'react-dom';
import Root from './container/Root';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

// Add the sessionReducer
const reducer = combineReducers({
  session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

const options = { refreshOnCheckAuth: false, redirectPath: '/login' };// , driver: 'COOKIES'
// Init the session service
sessionService.initSessionService(store ,options);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 
 