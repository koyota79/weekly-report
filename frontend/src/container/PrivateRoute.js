import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component , exact = false , authenticated}) => (    
  <Route
    exact={exact}
    render={props => (
        authenticated
        ? <Component {...props} authenticated={authenticated} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }}  />
    )}
  />
);

export default PrivateRoute;