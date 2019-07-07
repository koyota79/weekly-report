import React from 'react';
// const reqHeader = new Headers({
//     //"Content-Type": "multipart/form-data",
//     'Authorization': 'Bearer '+ user.access_token,
// });

// const listUrl  = this.state.api_url + '/weekly_report';          
// fetch(
//     listUrl, {
//         method  : "POST",
//         body    : form,
//         headers : reqHeader
//     }
// ).then(response => {
//     console.log('::::::fetch::::')
//     console.log(response)
//     if (response.ok) {
//         response.json().then(json => 
//             this.setState({
//                 LIST        : json.LIST,
//                 statusText  : 'OK',
//             })    
//         )
//     } else {
//         response.json().then(json => alert(json.msg))
//     }
// }).catch(err =>  {
//     alert(err.message);
// });

// response.json().then(json => 
//     this.setState({
//         LIST        : json.LIST,
//         statusText  : 'OK',
//     })    
// )

export const cf_fetchPost = (form ,props) => {
    console.log('cf_fetch')
    console.log(form.get('access_token'))
    const v_access_token = form.get('access_token')
    const v_url          = form.get('url')
    if(v_access_token !== undefined && v_access_token !== null){
        const reqHeader = new Headers({
            'Authorization': 'Bearer '+ v_access_token,
        });

    return fetch(
                v_url, {
                    method  : "POST",
                    body    : form,
                    headers : reqHeader
                }
            ).then(response => {
                console.log('::::::cnfetch::::')
                console.log(response)
                console.log(props)
                //return response
                if (response.ok) {
                    return response
                } else {
                    if(response.status === 401){
                        response.json().then(json => {
                            props.actions.logout(props.history)
                            alert(json.msg)
                        })
                    }else{
                        response.json().then(json => console.log(json.msg))
                        return response
                    }

                }
            }).catch(err =>  {
                alert(err.message);
            });
        
    }else{
        //console.log('token required')
        throw new Error("token required")
    }
}


export const cf_selectOptions = (optionsMap) => {
    return optionsMap.map((i) => {
        return <option key={i.value} value={i.value}>{i.name}</option>
    })
}