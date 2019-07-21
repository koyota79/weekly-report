import React from 'react';
import * as JWT from 'jwt-decode';
import { sessionService } from 'redux-react-session';
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

export const cf_fetchPost = (form ,session) => {
    const {access_token ,props} = session
    console.log('::cf_fetchPost::props')
    console.log(props)
    const v_url          = form.get('url')
    if(access_token !== undefined && access_token !== null){
        const reqHeader = new Headers({'Authorization': 'Bearer '+ access_token,});
        return fetch(
                    v_url, {
                        method  : "POST",
                        body    : form,
                        headers : reqHeader
                    }
                ).then(response => {
                    console.log('::::::cnfetch::::')
                    console.log(response)
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
        props.actions.logout(props.history)
        throw new Error("token 만료")
    }
}


export const cf_selectOptions = (optionsMap) => {
    
    if(!optionsMap)
        return

    return optionsMap.map((i) => {
        return <option key={i.value} value={i.value}>{i.name}</option>
    })
}


export const cf_getSelectCode = (query) => {
    let form = new FormData() 
    form.append('p_type',       query.type?query.type:"")
    form.append('p_menu',       query.menu?query.menu:"")
    form.append('p_class',      query.class?query.class:"")
    form.append('p_part',       query.part?query.part:"")

    return fetch(
                query.url, {
                    method  : "POST",
                    body    : form
                    //headers : reqHeader
                }
            ).then(response => {
                console.log('::::::cf_getSelectCode::::')
                console.log(response)
                return response
            }).catch(err =>  {
                alert(err.message);
                return err
            });
};

export const cf_getDecodeToken = (access_token) => {
    var jwtDecode    = JWT(access_token);
    console.log(":::cf_getDecodeToken decode:::::")
    console.log(jwtDecode)
    return jwtDecode.identity
}






export const cf_fetchPost2 = (form ,props) => {
    return sessionService.loadUser().then(result => {
        const access_token = result.access_token
        const v_url        = form.get('url')
        if(access_token !== undefined && access_token !== null){
            const reqHeader = new Headers({'Authorization': 'Bearer '+ access_token,});
            return fetch(
                        v_url, {
                            method  : "POST",
                            body    : form,
                            headers : reqHeader
                        }
                    ).then(response => {
                        console.log('::::::cnfetch2::::')
                        console.log(response)
                        if (response.ok) {
                            return response
                        } else {
                            if(response.status === 401){
                                response.json().then(json => {
                                    console.log('::::::props::::::')
                                    console.log(props)
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
            props.actions.logout(props.history)
            throw new Error("token 만료")
        }

    })

    
}