import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../action/SessionActions';
//import {Nav ,Navbar ,Form ,Button ,FormControl} from 'react-bootstrap';

const LogoutButton = ({ Button ,history, logout }) => (
//   <button
//     onClick={() => logout(history)}
//   >
//     LOGOUT
//   </button>
    <Button variant="outline-light"  onClick={() => logout(history)}>Logout</Button>
);

const mapDispatch = dispatch => ({
  logout: history => dispatch(logout(history))
});

export default connect(null, mapDispatch)(withRouter(LogoutButton));