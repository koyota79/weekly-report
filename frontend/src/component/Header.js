import React , { Component } from 'react';
import {Nav ,Navbar ,Form ,Button ,FormControl} from 'react-bootstrap';
import LogoutButton from '../component/LogoutButton';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//{Nav ,Navbar ,Form ,Button ,FormControl}
//const Header = (props) => {
class Header extends Component{
    render(){
      console.log('::::Header:::::')
      console.log(this.props)
      const {user} = this.props.user
      return ( 
          <div>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">WEEKLY REPORT</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/report">주간보고</Nav.Link>
              </Nav>
              <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button> */}
                <Navbar.Brand href="">{user?user.name:''}</Navbar.Brand>
                <LogoutButton Button={Button}/> 
              </Form>
            </Navbar>
          </div>
      )
    }
}

//export default Header;
const mapState = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch) 
  };
};



export default connect(mapState, mapDispatch)(Header);