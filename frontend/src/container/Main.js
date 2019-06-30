import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';

class Main extends Component{
    state = {
        isTrue      : false
    }
    render(){
        console.log("MAIN")
        console.log(this.props)
        const {isTrue} = this.state
        return ( 
            <div>
            Main   {/*  {isTrue?"Main":<Redirect to="/login"/>  }      */}
            </div>
        )
    }
}

export default Main;