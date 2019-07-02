import React from 'react';
import { Route } from 'react-router';
import { sessionService } from 'redux-react-session';
import App from './component/App';
import Home from './component/Home';
import Login from './component/Login';

export default (
  <Route path="/" component={App}>
    <Route exact  onEnter={sessionService.checkAuth} component={Home} />
    <Route path="/login" component={Login} />
  </Route>
);