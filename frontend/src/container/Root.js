
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  BrowserRouter as Router, Route ,Redirect,Switch} from 'react-router-dom';
//import PrivateRoute from 'react-private-route'
import PrivateRoute from './PrivateRoute';
import '../App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Report from '../report/ReportHome';
import Login from '../login/Login';  
import Main from './Main';
import PropTypes from 'prop-types';
import * as sessionActions  from '../action/SessionActions';
import Header from '../component/Header';
//import { createBrowserHistory } from "history";
//const history = createBrowserHistory();

const Root = ({ authenticated, checked }) => (
    <Router>
        { checked &&
        <div>
            {authenticated?<Header />:""}
            <Switch>
                <PrivateRoute exact path="/" component={Main} authenticated={authenticated}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
        }
    </Router>
);

const { bool } = PropTypes;

Root.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState ,mapDispatch)(Root);