import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainNotice from '../component/MainNotice'; 
import {cf_fetchPost ,cf_getDecodeToken} from '../component/common/CommonMethod';

//import LogoutButton from '../component/LogoutButton';

class Main extends Component{
    state = {
        api_url     : process.env.REACT_APP_API_URL,
        LIST        : []
    }

    componentWillMount() {
        const userSession = sessionService.loadUser();
              userSession.then(response => { 
                    console.log('::::MAIN componentWillMount:::::')
                    console.log(response)
                    const access_token = response.access_token
                    const {levels ,name ,part} = cf_getDecodeToken(access_token)

                    let mainObj = {
                        'session'      : {
                            'access_token' : access_token,
                            'props'        : this.props
                        }
                    }
                    this.setState({
                        user_levels  : levels ,
                        user_name    : name ,
                        user_part    : part,
                        session      : mainObj.session
                    })
                    this.handlerMainNotice(mainObj.session)

                }
              )
    
    }   

    handlerMainNotice = (initSession) =>{
        try {
            const {api_url } = this.state

            let form = new FormData() 
            form.append('url',              api_url + '/weekly_main_notice')

            cf_fetchPost(form ,initSession).then(reponse => {
                console.log(reponse)
                if(reponse.ok){
                    reponse.json().then(json => {
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
        } catch (e) {
            alert(e);
        }    
        
    }

    render(){
        console.log("MAIN")
        console.log(this.props)
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

const mapState = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
  });
  
const mapDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(sessionActions, dispatch) 
    };
};


  
export default connect(mapState, mapDispatch)(Main);