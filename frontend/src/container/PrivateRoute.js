import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated}) => (    
  <Route
    render={props => (
        authenticated
        ? <Component props={props} authenticated={authenticated} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;