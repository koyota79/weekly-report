import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
//import { Router } from 'react-router'; 
//yarn add @version/react-router-v3 ,yarn add webpack --dev,yarn add --dev babel-preset-stage-1 ,yarn add webpack-dev-middleware ,yarn add webpack-hot-middleware
//yarn add html-webpack-plugin yarn add babel-loader
/*
react-router@3.2.0 업그레이드   yarn add json-loader@0.5.4 yarn add react-router-dom@4.4.0-beta.6
*/
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
//import Root from './container/Root';
// Add the sessionReducer
import App from './component/App';
const reducer = combineReducers({
  session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
sessionService.initSessionService(store, { driver: 'LOCALSTOREAGE' });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
