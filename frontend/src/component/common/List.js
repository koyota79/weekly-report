import React from 'react';
//import {Link} from "react-router-dom";
//import {BrowserRouter} from "react-router-dom";
import Table from 'react-bootstrap/Table';


const List = (props ) => {
    console.log(":::::::::LIST1::::::::::::::" ); 
    console.log(props);
    console.log(":::::::::LIST2::::::::::::::" ); 

    return props.data.LIST?(
      
            <Table striped bordered hover>
            <thead>
                <tr>
                    {
                        props.data.HEDER.map((item,i) => (
                            <th key={i}>{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.LIST.map((item,i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            {
                                Object.getOwnPropertyNames( props.data.LIST[0]).map((keyObj ,n) => {
                                    return (!keyObj.includes("id")?(
                                                <td key={n} onClick={() => props.onClick(item) } > 
                                                    {item[keyObj]} 
                                                </td>
                                            ):(null)
                                    )
                                })
                            }
                            <td><div onClick={() => props.onRemove(item.id)} >-</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    ):(
        (   

            <Table striped bordered hover>
                <thead>
                     <tr>
                         {
                             props.data.HEDER.map((item,i) => (
                                 <th key={i}>{item}</th>
                             ))
                         }
                     </tr>
                 </thead>
                 <tbody>
                     <tr><td>NO DATA</td></tr>
                 </tbody>
             </Table>
        )
    
    );


    // if(props.LIST.list === null){
    //     return(
    //         <Table striped bordered hover>
    //             <thead>
    //                 <tr>
    //                     {
    //                         props.HEDER.map((item,i) => (
    //                             <th key={i}>{item}</th>
    //                         ))
    //                     }
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr><td>NO DATA</td></tr>
    //             </tbody>
    //         </Table>
    //     );
    // }else{
    // console.log(props.LIST.list?'1':'0');

    // const v_name  = Object.getOwnPropertyNames( props.LIST.list[0]);
    //     return (

    //         <Table striped bordered hover>
    //             <thead>
    //             <tr>
    //                 {
    //                     props.HEDER.map((item,i) => (
    //                         <th key={i}>{item}</th>
    //                     ))
    //                 }
    //             </tr>
    //             </thead>
    //             <tbody>
    //                 {   props.LIST.map((item,i) => (
    //                         <tr key={i}>
    //                                 <td>{i+1}</td>
    //                                 {  
    //                                     v_name.map((keyObj ,n) => {
    //                                         if(!keyObj.includes("__KEY")){
    //                                            return <td key={n} onClick={() => props.onClick(item) } >
    //                                                 {item[keyObj] }
    //                                             </td>   
    //                                         }else{
    //                                             return null
    //                                         }
                                            
    //                                         //hidden 일경우
    //                                         // keyObj.includes("__KEY")? //true or false 리턴값
    //                                         // (
    //                                         //   /*<td key={n}> <input type ='hidden' name={keyObj} value={item[keyObj]} key={n} /> </td>*/
    //                                         //   <input type ='hidden' name={keyObj} value={item[keyObj]} key={n} /> 
    //                                         // )
    //                                         // :
    //                                         // (<td key={n} onClick={() => props.onClick(item) } >{
    //                                         //         item[keyObj] 
    //                                         //   //console.log(item[keyObj]) 
    //                                         // }</td> )
    //                                   })  
    //                                 }
    //                                 <td><div onClick={() => props.onRemove(item.INDEX__KEY)} >-</div></td>
    //                         </tr>
    //                     ))
    //                 }
    //             </tbody>
    //         </Table>

    //     )//end retrun
    // }
}

export default List;

/*
       { props.data.map((item,i) => (
                    <li key={item.seq}>
                        <Link to="/" className="link_webtoon">
                            <div className="info_webtoon">
                                <strong className="tit_webtoon">
                                    {item.title}
                                </strong>
                                {item.content}
                            </div>
                        </Link>
                    </li>
                )) 
        }

*/