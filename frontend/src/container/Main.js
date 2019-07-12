import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import LogoutButton from '../component/LogoutButton';

class Main extends Component{
    state = {
        isTrue      : false
    }

    componentWillMount() {
        const userSession = sessionService.loadUser();
              userSession.then(response => { 
                    console.log('::::MAIN componentWillMount:::::')
                    console.log(response)
                }
              )
    
    }   

    render(){
        console.log("MAIN")
        console.log(this.props)
        return ( 
            <div>
                Main
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