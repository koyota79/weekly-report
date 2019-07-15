import React from 'react';
//import {Link} from "react-router-dom";
//import {BrowserRouter} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import {Button  } from 'react-bootstrap';

const List = (props ) => {
    console.log(":::::::::LIST1::::::::::::::" ); 
    console.log(props);
    console.log(":::::::::LIST2::::::::::::::" ); 
    let v_btnWeek = props.data.nowWeek
    return props.data.LIST.length > 0 ?(
      
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {
                        props.data.HEDER.map((item,i) => (
                            <th key={i}  style={{ textAlign : "center" , width :props.data.H_WIDTH[i]+"px" }} className="fontSize_12">
                                {item}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.LIST.map((item,i) => (
                        <tr key={i} className={(props.data.EDITING && props.data.id===item.id)?"upd-corlor":""}> 
                            {props.data.numbering?<td>{i+1}</td>:null}
                            {
                                Object.getOwnPropertyNames( props.data.LIST[0]).map((keyObj ,n) => {
                                    return ( (!keyObj.includes("id") && !keyObj.includes("__H"))?(
                                                <td key={n} onDoubleClick={() => props.data.btn_use?props.onDoubleClick(item):'' } className="fontSize_13" > 
                                                    {item[keyObj]}
                                                </td>
                                            ):(null)
                                    )
                                })
                            }
                            {props.data.btn_use?
                                <td> 
                                    {
                                        (() => {
                                            if (v_btnWeek === 0){ return (<div>
                                                <Button variant="danger" size="sm" className="fontSize_10" style={{ marginLeft: '10px'}}  onClick={() => props.onRemove(item.id)}  > 
                                                    삭제
                                                </Button>
                                            </div>);
                                            }else if (v_btnWeek < 0){ return (<div>
                                                <Button variant="success" size="sm" className="fontSize_10" style={{ marginLeft: '10px'}}  onClick={() => props.onReportCopy(item.id)}  > 
                                                    복사
                                                </Button>
                                            </div>);
                                            }else{
                                                return (<div></div>);
                                            }
                                        })()
                                    }   
                                </td>
                            :null}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    ):(
        (   

            <Table striped bordered hover size="sm">
                <thead>
                     <tr>
                         {
                             props.data.HEDER.map((item,i) => (
                                 <th key={i} style={{ textAlign : "center" , width :props.data.H_WIDTH[i]+"px" }} className="fontSize_14">{item}</th>
                             ))
                         }
                     </tr>
                 </thead>
                 <tbody>
                     <tr><td  colSpan={props.data.H_WIDTH.length} style={{ textAlign: 'center'}}>NO DATA</td></tr>
                 </tbody>
             </Table>
        )
    
    );
}

export default List;