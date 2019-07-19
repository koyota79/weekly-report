import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../component/Header';

const PrivateRoute = ({ component: Component , exact = false , authenticated}) => {    
 return <div>
          <Header />
          <Route
              exact={exact}
              render={props => (
                  authenticated
                  ? <Component {...props} authenticated={authenticated} />
                  : <Redirect to={{ pathname: '/login', state: { from: props.location } }}  />
              )}
            />
        </div>
};

export default PrivateRoute;