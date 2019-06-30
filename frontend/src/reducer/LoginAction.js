import { combineReducers } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ,LOGIN_ERROR } from '../action/LoginProc.js';

const defaultState = {
  isSuccess: false,
  result: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        result: action.result.data
      };
      
    case LOGIN_FAILURE:
      return {
        ...state,
        isSuccess: true,
        result: action.result.data
      };
      case LOGIN_ERROR:
          return {
            ...state,
            isSuccess: false
          };      
    default:
      return state
  }
};

export default combineReducers({
  result: userReducer
});