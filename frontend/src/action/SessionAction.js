import { createBrowserHistory } from 'history'
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/SessionApi';

export const login = (user) => {
  return () => {
    return sessionApi.login(user).then(response => {
      const { token } = response;
      sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser(response.data)
        .then(() => {
            createBrowserHistory.replace('/');
        });
      });
    });
  };
};

export const logout = () => {
  return () => {
    return sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      createBrowserHistory.replace('/login');
    }).catch(err => {
      throw (err);
    });
  };
};