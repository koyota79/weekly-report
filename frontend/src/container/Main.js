import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import LogoutButton from '../component/LogoutButton';

class Main extends Component{
    state = {
        isTrue      : false
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