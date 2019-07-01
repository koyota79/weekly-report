import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';

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

export default Main;