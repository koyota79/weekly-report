import axios from 'axios';

export const login = (user ,history) => {
    // const login_init = {
    //   url  : process.env.REACT_APP_API_URL  ,
    //   token: '1a2b3c4dff',
    //   data: {
    //     userId  : '',
    //     name    : '',
    //     levels  : 1
    //   }
    // };
    let form = new FormData() 
    form.append('p_userId',      user.userId)
    form.append('p_password',    user.password)
    const response = axios.post(process.env.REACT_APP_API_URL+'/login', form);

    return new Promise(resolve => setTimeout(resolve(response), 1000));
  };
  
export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
