export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR   = 'LOGIN_ERROR';

export const loginRequest = (userId, password) => {
  return {
    type: LOGIN,
    promise: {url: process.env.REACT_APP_API_URL+'/login', data: { userId, password } }
  };
}