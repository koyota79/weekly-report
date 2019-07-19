import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
//import * as sessionActions  from '../action/SessionActions';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import MainNotice from '../component/MainNotice'; 
import {cf_fetchPost,cf_fetchPost2 ,cf_getDecodeToken} from '../component/common/CommonMethod';

//import LogoutButton from '../component/LogoutButton';

class Main extends Component{
    state = {
        api_url     : process.env.REACT_APP_API_URL,
        LIST        : []
    }

    componentWillMount() {
        this.handlerMainNotice()
    }   

    handlerMainNotice = () =>{
        let form = new FormData() 
        form.append('url',   this.state.api_url + '/weekly_main_notice')
        cf_fetchPost2(form,this.props).then(response => {
            if(response.ok){
                response.json().then(json => {
                    console.log(json)
                    if(json.result ==='Y'){
                        console.log(json.LIST)
                        this.setState({
                            LIST : json.LIST
                        })
                    }else{
                        alert(json.message)
                    }
                })
            }
        }).catch(err => console.log(err))     
    }

    render(){
        console.log("MAIN")
        return ( 
            <div>
                <div>top</div>
                    <div>
                        <div>test
                        </div>
                        <div style={{left : '15%' ,position : 'relative' ,width : '1000px'}}>
                            <MainNotice props={this.state}/>
                        </div>        
                    </div>
                <div>Main</div>
            </div>
        )
    }
}

// const mapState = (state) => ({
//     user: state.session.user,
//     authenticated: state.session.authenticated
//   });
  
// const mapDispatch = (dispatch) => {
//     return {
//       actions: bindActionCreators(sessionActions, dispatch) 
//     };
// };
// export default connect(mapState, mapDispatch)(Main);

export default Main;