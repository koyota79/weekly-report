import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

export const login = (user, history) => {
  return () => {
    return sessionApi.login(user).then(response => {
      console.log(":::::SessionAction::::::")
      console.log(response)
      const { access_token ,user} = response.data;
      if(access_token ==='' && user.status === 'E'){
        alert(user.message)
        return
      }

      sessionService.saveSession({ access_token }).then(() => {        
        console.log(":::::saveSession::")
        console.log(response.data)
        sessionService.saveUser(response.data).then(() => {
          history.push('/');
        }).catch(err => alert(err));
      }).catch(err => alert(err));
    }).catch(err => alert(err));
  };
};

export const logout = (history) => {
  console.log(":::::logout::::::")
  console.log(history)
  return () => {
    return sessionApi.logout().then(() => {
      console.log(":::::deleteSession::::::")
      sessionService.deleteSession();      
      sessionService.deleteUser();
      history.push('/login');
    }).catch(err => {
      throw (err);
    });
  };
};