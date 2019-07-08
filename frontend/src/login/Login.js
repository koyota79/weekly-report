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
    const { user } = this.state;
    const { login } = this.props.actions;
    login(user, history);
  }

  render(){
    console.log(":::LOGIN:::::")
    const { user: { userId, password } } = this.state;
    const { history } = this.props;
    //라우트가 아닌 컴포넌트에서 라우터에서 사용하는 객체 - location, match, history 를 사용하려면 withRouter
    // const SubmitButton = withRouter(({ history }) => (
    //   <Button
    //     block
    //     onClick={() => this.onSubmit(history)}
    //     disabled={!this.validateForm()}
    //     >
    //     Login
    //   </Button>
    // ));

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
                placeholder="Password" 
                onKeyPress={event => {
                  if (event.key === "Enter" && this.validateForm()) {
                    this.onSubmit(history);
                }}}
            />
            
            <Button
              block
              onClick={() => this.onSubmit(history)}
              disabled={!this.validateForm()}
              >
              Login
            </Button>

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