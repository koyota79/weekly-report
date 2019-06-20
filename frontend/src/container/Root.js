
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../component/Header';
import Gnb from '../component/Gnb';

import { Container, Row, Col } from 'reactstrap';

import Report from '../report/ReportHome'; 
import Main from './Main';

class Root extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Container>
                        <Header />  
                        <Row>
                        <Col sm={2}><Gnb /></Col>
                                <Col sm={10}>         
                                    <Route exact path="/"   component={Main}/>
                                    <Route path="/report"   component={Report}/>
                                </Col>
                        </Row>
                    </Container>   
                </BrowserRouter>             
            </div>
        );
    }
}
export default Root;