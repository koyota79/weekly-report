import React ,{Component} from 'react';
//import { Route } from 'react-router';
import { Container } from 'reactstrap';
import { sessionService } from 'redux-react-session';
import App from './component/App';
import Home from './component/Home';
import Login from './component/Login';
import {  BrowserRouter as Router, Route ,Redirect,Switch} from 'react-router-dom';
import './App.css';

//import Report from '../report/ReportHome';
//import Login from '../login/Login';  

class routes extends Component {  
  render() {
    return (
        <div>
          <BrowserRouter>
            <Container style={{ maxWidth: '1300px'}} > 
              <Router path="/" component={App}>
                <Route exact  onEnter={sessionService.checkAuth} component={Home} />
                <Route path="/login" component={Login} />
              </Router>
            </Container>
          </BrowserRouter>
        </div>
    );
  }
}
export default routes;