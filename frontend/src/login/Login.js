//import axios from 'axios';
import React, { Component } from "react";
import { Button,  FormGroup, FormControl ,FormLabel ,Form } from "react-bootstrap"; //HelpBlock ControlLabel
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../action/SessionActions';
import { withRouter } from 'react-router-dom';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        userId    : '',
        password  : ''
      }
    }

  }

  handleChange = (e ) => {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  validateForm() {
    const { user: { userId, password } } = this.state;
    return userId.length > 0 && password.length > 0;
  }

  onSubmit(history) {
    console.log("history")
    console.log(history)
    const { user } = this.state;
    const { login } = this.props.actions;
    console.log(login)
    login(user, history);
  }

  render(){
    console.log(":::LOGIN:::::")
    console.log(this.props)
    const { user: { userId, password } } = this.state;
    const SubmitButton = withRouter(({ history }) => (
      <Button
        block
        onClick={() => this.onSubmit(history)}
        disabled={!this.validateForm()}
        >
        Login
      </Button>
    ));
  

    return (
      <div className="LoginForm">
        <Form>
            <FieldGroup
                id="userId"
                type="id"
                name="userId"
                value={userId}
                onChange={this.handleChange}
                placeholder="아이디"
            />
            <FieldGroup 
            id="password" 
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password" />

            <SubmitButton />

        </Form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Login);