import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
//import { Router } from 'react-router'; 
//yarn add @version/react-router-v3 ,yarn add webpack --dev,yarn add --dev babel-preset-stage-1 ,yarn add webpack-dev-middleware ,yarn add webpack-hot-middleware
//yarn add html-webpack-plugin yarn add babel-loader
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
//import Root from './container/Root';
// Add the sessionReducer
const reducer = combineReducers({
  session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
sessionService.initSessionService(store, { driver: 'COOKIES' });

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);
