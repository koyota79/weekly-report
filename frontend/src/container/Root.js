
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import { Router, Route,  browserHistory } from 'react-router';
import {  BrowserRouter, Route ,Switch} from 'react-router-dom';
import Header from '../component/Header';
//import Gnb from '../component/Gnb';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import configureStore from '../store/ConfigureStore';
import '../App.css';
import Report from '../report/ReportHome';
import Login from '../login/Login';  
import Main from './Main';
//import { Row } from 'react-bootstrap';
const store = configureStore();

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter>
                        <Container style={{ maxWidth: '1300px'}} >     
                            <Header/>
                            <Switch>
                                <Route exact path="/"    component={Main}/>  
                                <Route path="/report"    component={Report}/> 
                                <Route path="/Login"     component={Login}/> 
                            </Switch>
                        </Container> 
                    </BrowserRouter>             
                </Provider>

                {/* <Provider store={store}>
                    <BrowserRouter>
                        <Header/>
                        <Row>
                        <Route exact path="/"    component={Main}/>  
                        <Route path="/report"   component={Report}/> 
                        </Row>
                    </BrowserRouter>
                </Provider> */}
            </div>
        );
    }
}
export default Root;