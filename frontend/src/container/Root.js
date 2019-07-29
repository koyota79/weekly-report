
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
//import PrivateRoute from 'react-private-route'
import PrivateRoute from './PrivateRoute';
import '../App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReportManager from '../report/ReportManager';
import Report from '../report/ReportHome';
import Login from '../login/Login';  
import Main from './Main';
import PropTypes from 'prop-types';
import * as sessionActions  from '../action/SessionActions';
import UserInfoManager from '../user/UserInfoManager';

//import { createBrowserHistory } from "history";
//const history = createBrowserHistory();

const Root = ({ authenticated, checked }) => (
    <Router>
        { checked &&
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={Main} authenticated={authenticated}/>
                <PrivateRoute path="/report" component={Report} authenticated={authenticated}/>
                <PrivateRoute path="/report_manager" component={ReportManager} authenticated={authenticated}/>
                <PrivateRoute path="/user_manager" component={UserInfoManager} authenticated={authenticated}/>
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