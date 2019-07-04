import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../action/SessionAction';
import { Button,  FormGroup, FormControl ,FormLabel ,Form } from "react-bootstrap";
//import Input from './Input';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        userId: '',
        password: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    const { user } = this.state;
    const { login } = this.props.actions;
    login(user);
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }
  validateForm() {
    const { user } = this.state;
    console.log(user)
    return user.userId.length > 0 && user.password.length > 0;
  }
  render() {
    const { user: { userId, password } } = this.state;

    return (
      // <div>
      //   <h3>LOGIN</h3>
      //   <Input
      //     name="email"
      //     value={email}
      //     label="Email"
      //     type="email"
      //     onChange={this.onChange}
      //   />
      //   <Input
      //     name="password"
      //     value={password}
      //     label="Password"
      //     type="password"
      //     onChange={this.onChange}
      //   />
      //   <button onClick={this.onSubmit} type="submit">Submit</button>
      // </div>
      <div className="LoginForm">
        <Form>
            <FieldGroup
                id="userId"
                type="id"
                name="userId"
                value={userId}
                onChange={this.onChange}
                placeholder="아이디"
            />
            <FieldGroup 
                id="password" 
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password" 
            />
            <Button
                block
                onClick={this.onSubmit}
                disabled={!this.validateForm()}
                type="submit">
                Login
            </Button>
        </Form>
      </div>
    );
  }
}

// const { object } = PropTypes;

// Login.propTypes = {
//   actions: object.isRequired
// };

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Login);