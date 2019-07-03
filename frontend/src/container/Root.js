
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  BrowserRouter as Router, Route ,Redirect,Switch} from 'react-router-dom';
//import PrivateRoute from 'react-private-route'
import PrivateRoute from './PrivateRoute';
import '../App.css';
import { connect } from 'react-redux';
import Report from '../report/ReportHome';
import Login from '../login/Login';  
import Main from './Main';
import PropTypes from 'prop-types';
//import { createBrowserHistory } from "history";
//const history = createBrowserHistory();

const Root = ({ authenticated, checked }) => (
    <Router>
        { checked &&
        <div>
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

export default connect(mapState)(Root);