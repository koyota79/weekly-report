import React , { Component } from 'react';
import {Nav ,Navbar ,Form ,Button} from 'react-bootstrap';
import LogoutButton from '../component/LogoutButton';
//import * as sessionActions  from '../action/SessionActions';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
//import * as JWT from 'jwt-decode';
import {cf_getDecodeToken} from '../component/common/CommonMethod';

//{Nav ,Navbar ,Form ,Button ,FormControl}
//const Header = (props) => {
class Header extends Component{
    state = {
      userName  :''
    }

    componentWillMount() {
      //console.log('::::Header1:::::')
      sessionService.loadUser().then(response => { 
                  //console.log(response.access_token)
                  let level_class = ''
                  var access_token = response.access_token
                  const {levels ,name ,userId} = cf_getDecodeToken(access_token)
                  
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
        }).catch(e => console.log(e));       
    }

    componentDidMount(){
    //console.log('::::Header componentDidMount:::::')
    }

    render(){
      console.log('::::Header render:::::')
      //console.log(this.state)
      const {userLevels} = this.state

      return ( 
          <div>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">WEEKLY REPORT</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/report">주간보고</Nav.Link>
                {
                  userLevels >1?(
                    <Nav.Link href="/report_manager">주간보고 현황</Nav.Link> 
                  )
                  :('') 
                }
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

export default Header;
// const mapState = (state) => ({
//   user: state.session.user,
//   authenticated: state.session.authenticated
// });

// const mapDispatch = (dispatch) => {
//   return {
//     actions: bindActionCreators(sessionActions, dispatch) 
//   };
// };



// export default connect(mapState, mapDispatch)(Header);