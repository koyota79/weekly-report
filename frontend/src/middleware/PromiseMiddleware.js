import axios from 'axios';

export default () => {
  return next => action => {
    const { promise, type ,...rest } = action;
    next({ ...rest, type: `${type}_REQUEST` });
    console.log("::::MIDDLEWARE::::::" + type)
    const {userId ,password} = promise.data
    let form = new FormData() 
    form.append('p_userId',      userId)
    form.append('p_password',    password) 
    return  axios.post(promise.url, form
    ).then(result => {
        console.log(":::_SUCCESS:::")
        //console.log(result)
        result.msg = "test";
        if(result.loginYn === "Y"){
          next({ ...rest, result, type: `${type}_SUCCESS` });
        }else{
          next({ ...rest, result, type: `${type}_FAILURE` });
        }

    }).catch(error => {
        console.log("::::MIDDLEWARE error::::::")
        console.log(error)
        next({ ...rest, error, type: `${type}_ERROR` });
    });
  };
};