
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import { Router, Route,  browserHistory } from 'react-router';
import {  BrowserRouter, Route ,Redirect,Switch} from 'react-router-dom';
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
    state ={
        "loggedInfo" : false,
        "action"     : window.location.pathname
    }
    initializeUserInfo = async () => {
        const loggedInfo =  localStorage.getItem("loggedInfo"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        console.log(loggedInfo)
        if(loggedInfo ==="Y") {
            //window.location.href = '/login';
            this.setState({
                "loggedInfo" : true
            })
     
        } 

        // const { UserActions } = this.props;
        // UserActions.setLoggedInfo(loggedInfo);
        // try {
        //     await UserActions.checkStatus();
        // } catch (e) {
        //     storage.remove('loggedInfo');
        //     window.location.href = '/auth/login?expired';
        // }
    }

    componentDidMount() {
        this.initializeUserInfo();
    }


    render() {
        const {loggedInfo ,action} = this.state;
        let HideHeader = !loggedInfo ? null : <Header />
        console.log(loggedInfo + ":::::::" + action)
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter>
                        <Container style={{ maxWidth: '1300px'}} > 
                                <Route>
                                    {HideHeader}
                                    <Route exact path="/"    component={Main} />          
                                    <Route path="/report"    component={Report} />                 
                                    <Route path="/login"     component={Login} />
                                    {!loggedInfo?<Redirect to="/login"/>:<Redirect to={action} />}
                                </Route>
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