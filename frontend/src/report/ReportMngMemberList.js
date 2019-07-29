import React from 'react';
import { Table ,Badge } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 

//yarn add react-html-parser
//class ReportMngMemberList extends React.Component {
  //render() { 
const ReportMngMemberList = ({data ,onPosition} ) => {
    return (
      <Table bordered style={{fontSize : '12px'}}>
        <thead>
          <tr style={{textAlign : 'center'}}>
            <th>#</th>
            <th>LMS</th>
            <th>모바일</th>
            <th>단위업무</th>
          </tr>
        </thead>
        <tbody>

        {         
            data.LIST_SUB.map((item,i) => 
             <tr key={i}><th scope="row">성명</th>
                    <td>
                      {
                        item.lms?item.lms.split(',').map( (line,j) => {
                          const user  =  line.split('|')
                          let v_hmlt  =  user[0]  + '('+ user[1] + ')' + '<span style=margin-left:30px;> -&nbsp;[진행중:&nbsp;' + user[3]
                              v_hmlt +=  '&nbsp;&nbsp;완료:&nbsp;' + user[4] +']'

                          return(                               
                            <span key={j}>  
                              <span onClick={(e) => onPosition( {event : e ,user_id : user[2]} )}>
                              { 
                                user[1] < 1?<span style={{color:'red'}}>{ReactHtmlParser(v_hmlt)}</span>:
                                (<span style={{cursor:'pointer'}}>{ReactHtmlParser(v_hmlt)}</span>)
                              }
                              </span>                             
                              <span style={{marginLeft:'10px'}}>{(data.EDITING && data.selectId === user[2]) ?<Badge color="success">V</Badge>:''}</span> 
                              <br/> 
                            </span>
                          )} 
                          ):(null)
                      }
                    </td>
                    <td>
                      {
                        item.mobile?item.mobile.split(',').map( (line,j) => {
                          const user  =  line.split('|')
                          let v_hmlt  =  user[0]  + '('+ user[1] + ')' + '<span style=margin-left:30px;> -&nbsp;[진행중:&nbsp;' + user[3]
                              v_hmlt +=  '&nbsp;&nbsp;완료:&nbsp;' + user[4] +']'

                          return(                               
                            <span key={j}>  
                              <span onClick={(e) => onPosition( {event : e ,user_id : user[2]} )}>
                              { 
                                user[1] < 1?<span style={{color:'red'}}>{ReactHtmlParser(v_hmlt)}</span>:
                                (<span style={{cursor:'pointer'}}>{ReactHtmlParser(v_hmlt)}</span>)
                              }
                              </span>                             
                              <span style={{marginLeft:'10px'}}>{(data.EDITING && data.selectId === user[2]) ?<Badge color="success">V</Badge>:''}</span> 
                              <br/> 
                            </span>
                          )} 
                          ):(null)
                      }
                    </td>
                    <td>
                      {
                        item.unit?item.unit.split(',').map( (line,j) => {
                            const user  =  line.split('|')
                            let v_hmlt  =  user[0]  + '('+ user[1] + ')' + '<span style=margin-left:30px;> -&nbsp;[진행중:&nbsp;' + user[3]
                                v_hmlt +=  '&nbsp;&nbsp;완료:&nbsp;' + user[4] +']'

                            return(                               
                              <span key={j}>  
                                <span onClick={(e) => onPosition( {event : e , cnt : user[1] ,user_id : user[2]} )}>
                                { 
                                  user[1] < 1?<span style={{color:'red'}}>{ReactHtmlParser(v_hmlt)}</span>:
                                  (<span style={{cursor:'pointer'}}>{ReactHtmlParser(v_hmlt)}</span>)
                                }
                                </span>                             
                                <span style={{marginLeft:'10px'}}>{(data.EDITING && data.selectId === user[2]) ?<Badge color="success">V</Badge>:''}</span> 
                                <br/> 
                              </span>
                            )} 
                            ):(null)
                      }
                    </td>
             </tr>
            )
        }
        </tbody>
      </Table>
    );
  }


export default ReportMngMemberList;