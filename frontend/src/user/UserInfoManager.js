import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {cf_fetchPost2} from '../component/common/CommonMethod';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserInfoList  from './UserInfoList';

class UserInfoManager extends Component{
    constructor(props) {
        super(props)
        this.state =  {
            api_url        : process.env.REACT_APP_API_URL,
            LMS            : []
        }
    }

    componentWillMount() {
        this.handleUserMngList()
    }   


    handleUserMngList = () => {
        try {
            const { LMS } = this.state;
            let form = new FormData() 
            form.append('url',           this.state.api_url + '/user_manager') 
            cf_fetchPost2(form ,this.props).then(result => {
                result.json().then(json => 
                    //console.log(json)
                    this.setState({
                        LMS: json.map(
                            json => 'LMS' === 'LMS'
                        ? { ...json } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                        : LMS // 기존의 값을 그대로 유지
                        )
                    })
                ).catch(err => console.log(err));              
            }).catch(err => console.log(err));
           
        } catch (e) {
            alert(e)
        }
      
    }

    render(){
        console.log("UserInfoManager")
        console.log(this.state)
        return ( 
            <div>
                <UserInfoList />
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
});
  
const mapDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(sessionActions, dispatch) 
    };
};

export default connect(mapState, mapDispatch)(UserInfoManager);