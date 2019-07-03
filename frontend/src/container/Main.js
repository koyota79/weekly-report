import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Main extends Component{
    state = {
        isTrue      : false
    }
    render(){
        console.log("MAIN")
        const {logout} = sessionActions
       // console.log(this.props)
        //console.log(logout)
        const {history } = this.props
        console.log(history)
        return ( 
            <div>
                Main
                <button onClick={() => logout(history)} >
                    LOGOUT
                </button>
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