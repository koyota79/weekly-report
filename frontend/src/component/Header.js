import React , { Component } from 'react';
import {Nav ,Navbar ,Form ,Button} from 'react-bootstrap';
import LogoutButton from '../component/LogoutButton';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as JWT from 'jwt-decode';
//import {} from '../component/common/CommonMethod';

//{Nav ,Navbar ,Form ,Button ,FormControl}
//const Header = (props) => {
class Header extends Component{
    state = {
      userName  :''
    }

    componentDidMount() {


    // var _promise = function () {
    //     return new Promise(function (resolve, reject) {
    //       setTimeout(function () {
    //         resolve('Y')
    //       }, 1000);
    //     });
    // };
    // _promise().then(result => {
    // })
    
        setTimeout(() => {
          console.log('::::Header:::::')
          const {sessionInfo} = this.props
          try{

                let level_class = ''
                var access_token = sessionInfo.access_token

                var jwtDecode    = JWT(access_token);
                console.log(":::decode1:::::"+jwtDecode)
                console.log(jwtDecode)

                const {levels ,name ,userId} = jwtDecode.identity
                switch(levels) { 
                  case 2: { 
                    level_class = ' (파트장)';
                    break; 
                  } 
                  case 3: { 
                    level_class = ' (현장 관리자)';
                    break; 
                  }
                  case 9: { 
                    level_class = ' (슈퍼 관리자)';
                    break;    
                  } 
                  default: { 
                    level_class = ' (과장)';
                    break;              
                  } 
                }
                this.setState({
                  userLevels  : levels,
                  userName    : name + level_class,
                  userId      : userId,
                })
          }catch(e){
            alert(e)
          }
        }, 800)         
    }

    render(){
     
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
                <Navbar.Brand href="">{this.state.userName}</Navbar.Brand>
                <LogoutButton Button={Button}/> 
              </Form>
            </Navbar>
          </div>
      )
    }
}

//export default Header;
const mapState = (state) => ({
  sessionInfo: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch) 
  };
};



export default connect(mapState, mapDispatch)(Header);