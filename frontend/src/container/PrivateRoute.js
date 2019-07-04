import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component , exact = false , authenticated}) => (    
  <Route
    exact={exact}
    render={props => (
        authenticated
        ? <Component props={props} authenticated={authenticated} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;