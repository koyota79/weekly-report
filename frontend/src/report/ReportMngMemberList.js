import React from 'react';
import { Table } from 'reactstrap';

//class ReportMngMemberList extends React.Component {
  //render() {
const ReportMngMemberList = ({data ,onClick} ) => {
  console.log('ReportMngMemberList')
    console.log(data)
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
                        item.lms.split(',').map( (line,j) => 
                          ( <span key={j}> 
                              { line.indexOf('(0)')>0?<span style={{color:'red'}}>{line}</span>:line }
                              <br/> 
                            </span> 
                          ))
                      }
                    </td>
                    <td>
                      {
                        item.mobile.split(',').map( (line,j) => 
                          ( <span key={j} > 
                            { line.indexOf('(0)')>0?<span style={{color:'red'}}>{line}</span>:line }
                            <br/> 
                            </span> 
                          ))
                      }
                    </td>
                    <td>
                      {
                        item.unit.split(',').map( (line,j) => 
                            ( <span key={j}> 
                                { line.indexOf('(0)')>0?<span style={{color:'red'}}>{line}</span>:line }
                                <br/> 
                              </span> 
                            ))
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