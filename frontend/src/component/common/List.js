import React from 'react';
//import {Link} from "react-router-dom";
//import {BrowserRouter} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import {Button  } from 'react-bootstrap';

const List = (props ) => {
    //console.log(":::::::::LIST1::::::::::::::" ); 
    //console.log(props);

    const {closeBtn ,nowWeek ,btn_use} = props.data
    let tepmRows     =  0
    let tepmRows_2   =  0
    let tepmName     =  ''
    let tempGubunNm  =  ''
 
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
                        <tr key={i}  className={( (props.data.EDITING && (props.data.id===item.id || props.data.selectId === item['user_id']) ) )?"upd-corlor":""}> 
                            {props.data.numbering?<td>{i+1}</td>:null}
                            {
                                Object.getOwnPropertyNames( props.data.LIST[0]).map((keyObj ,n) => {
                                        let rowCnt          = item['rowspan__H']
                                        let rowCnt_2        = item['rowspan_name__H']
                                        let v_name          = item['name']
                                        let v_gubun_mng     = item['gubun_mng']
                                        let rowsPan         = null
                                        let rowsPan_2       = null
                                        let isTrue          = false
                                        let isGubunTrue     = false

                                        if(keyObj === 'gubun_mng'){
                                            if(tepmRows < rowCnt)
                                                rowsPan = rowCnt
                                            else if(tempGubunNm !==v_gubun_mng && rowCnt === 1 )
                                                isGubunTrue = true

                                            tepmRows    = rowCnt
                                            tempGubunNm = v_gubun_mng      
                                        }


                                        if(keyObj === 'name'){
                                            if(tepmRows_2 < rowCnt_2 )
                                                rowsPan_2 = rowCnt_2
                                            else if(tepmName !== v_name && rowCnt_2 ===1 )
                                                isTrue = true

                                            tepmRows_2    = rowCnt_2  
                                            tepmName      = v_name  
                                        }

      
                                    return ( (!keyObj.includes("id") && !keyObj.includes("__H"))?(
                                                (rowsPan||isGubunTrue)?(
                                                    <td key={n} rowSpan={rowsPan} onDoubleClick={() => btn_use?props.onDoubleClick(item):'' } 
                                                            className="fontSize_13" > 
                                                    {item[keyObj]}
                                                    </td>
                                                ):(
                                                    rowsPan_2?(
                                                        <td key={n} rowSpan={rowsPan_2} onDoubleClick={() => btn_use?props.onDoubleClick(item):'' } className="fontSize_13" > 
                                                        {item[keyObj]}
                                                        </td>
                                                    ):(
                                                        (!keyObj.includes("gubun_mng") && (!keyObj.includes("name") || isTrue))?(<td key={n} onDoubleClick={() => btn_use?props.onDoubleClick(item):'' } className="fontSize_13" > 
                                                            {item[keyObj]}
                                                        </td>):(null) 
                                                    )
                                                )
                                            ):(null)
                                    )
                                })
                            }
                            {props.data.btn_use?
                                <td> 
                                    {
                                        (() => {
                                            if (nowWeek === 0 || !closeBtn){ return (<div>
                                                <Button variant="danger" size="sm" className="fontSize_10" style={{ marginLeft: '10px'}}  onClick={() => props.onRemove(item.id)}  > 
                                                    삭제
                                                </Button>
                                            </div>);
                                            }else if (nowWeek < 0){ return (<div>
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