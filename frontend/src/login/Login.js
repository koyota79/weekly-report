//import axios from 'axios';
import React, { Component } from "react";
import { Button,  FormGroup, FormControl ,FormLabel ,Form } from "react-bootstrap"; //HelpBlock ControlLabel
import { connect } from 'react-redux';
import { loginRequest } from '../action/LoginProc';
//import  Authentication from '../component/Authentication';
import { Redirect  } from 'react-router-dom';

//yarn add redux react-redux
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
      userId    :"",
      password  :"",
      EDITING   :false
    }

 }

 handleChange = (e ) => {
  this.setState({
      [e.target.id] : e.target.value
  });
}

validateForm() {
  return this.state.userId.length > 0 && this.state.password.length > 0;
}

//   handleRegistration = e =>{
//     e.preventDefault() ;
//     let url = "http://localhost:5000/register"
//     let formData  = new FormData();
//     let data = this.state;
//     for(let name in data) {
//       formData.append(name, data[name]);
//     }

//     fetch(url, {
//       method: 'POST',
//       body: formData
//     }).then( res => res.json())
//     .then(data=>{
//       localStorage.setItem('access_token', data.access_token);
      
//       localStorage.setItem('userId', data.userId);

//       if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
//         window.location.replace("/")
//       }else{
//           alert(data.error)
//       }
//     }).catch(err => console.log(err));
//   }

  // handleLogin = (id,pw ) =>{
  //   this.props.loginRequest(id, pw).then(
  //         () => {
  //           if(isSuccess && result.loginYn === "Y") {
  //               // create session data
  //               console.log(this.props)
  //               //this.props.history.push('/report')
  //               //localStorage.setItem('token', response.data.token);
  //               //this.props.history.push('/Main'); 
  //               // let loginData = {
  //               //     isLoggedIn: isLoggedIn,
  //               //     userId: result.userId
  //               // };
            
  //               // document.cookie = 'key=' + btoa(JSON.stringify(loginData));

  //               // Materialize.toast('Welcome, ' + id + '!', 2000);
  //               //return true;
  //           } else {
  //               // let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
  //               // Materialize.toast($toastContent, 2000);
  //               //console.log("fail");
  //               //console.log(this.props)
  //               //return false;
  //           }
  //     }
  //   );
  // };

    // const { dispatch } = this.props;
    // const id = this.state.userId;
    // const pw = this.state.password;
    // dispatch(loginRequest(id, pw));
    // try{
    //     e.preventDefault() ;
    //     let formData  = new FormData();
    //     let data = this.state;

    //     for(let name in data) {
    //       formData.append(name, data[name]);
    //     }

    //     axios.post(process.env.REACT_APP_API_URL + '/login', formData
    //     ).then(response => { 
    //         console.log(response);
    //         if(response.data ==='Y'){
    //             localStorage.setItem('access_token', data.access_token);
      
    //             localStorage.setItem('userId', data.userId);
          
    //             if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
    //               window.location.replace("/")
    //             }else{
    //                 alert(data.error);
    //             }

    //         }else{
    //             alert('로그인 실패')
    //         }
    //     });
    // } catch (e) {
    //     alert(e)
    // }


    handleSignIn = () => {
      //const { dispatch } = this.props;
      const id = this.state.userId;
      const pw = this.state.password;
      //dispatch(loginRequest(id, pw));
      this.props.loginRequest(id, pw).then(
        () => {
          console.log("handleSignIn");
          this.setState({ EDITING: false });
        }
      );
      
    };

    handleToggleEdit = (e) => {
      e.preventDefault();
      const { EDITING  } = this.state;
      this.setState({ EDITING: !EDITING });
    }

    componentDidUpdate(prevProps, prevState) {
      // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
      // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
      // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
      console.log("::prevState::")
    
      if(!prevState.EDITING && this.state.EDITING) {
        // editing 값이 false -> true 로 전환 될 때
        // info 의 값을 state 에 넣어준다
        console.log(':::::::componentDidUpdate1111111:::')
   
        this.handleSignIn()
        //this.props.history.push('/')
      }
      if (prevState.EDITING && !this.state.EDITING) { 
        console.log(':::::::componentDidUpdate2222222:::')
        console.log(this.props)
        console.log(prevState)

        const {isSuccess ,result} = this.props.callback

        if(isSuccess && result.loginYn ==="Y"){
          this.props.history.push('/')
        }else{
          alert(result.msg)
          this.setState({
            userId    : "",
            password  : ""
          })
        }
        // editing 값이 true -> false 로 전환 될 때
      }
  }

  render(){
    //const {isSuccess ,result} = this.props.callback;

    //console.log(this.props)
    return (
      // isSuccess?<Redirect to="/"/>:
      <div className="LoginForm">
        <Form>
            <FieldGroup
                id="userId"
                type="id"
                name="userId"
                value={this.state.userId}
                onChange={this.handleChange}
                placeholder="아이디"
            />
            <FieldGroup 
            id="password" 
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password" />
            <Button
                block
                onClick={this.handleToggleEdit}
                disabled={!this.validateForm()}
                type="submit">
                Login
            </Button>

        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { callback: state.result }
}

function mapDispatchToProps(dispatch){
  return {
      loginRequest: (id, pw) => {
          return dispatch(loginRequest(id,pw));
      }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);