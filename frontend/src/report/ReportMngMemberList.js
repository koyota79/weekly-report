import React from 'react';
import { Table } from 'reactstrap';

//export default class Example extends React.Component {
  //render() {
export const MemberListCnt = (props ) => {
      
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
           props.data.LIST_SUB.map((item,i) => 
             <tr key={i}><th scope="row">성명</th>
                    <td>
                      {
                        item.lms.split(',').map( line => 
                          ( <span> 
                              { line.indexOf('(0)')>0?<span style={{color:'red'}}>{line}</span>:line }
                              <br/> 
                            </span> 
                          ))
                      }
                    </td>
                    <td>
                      {
                        item.mobile.split(',').map( line => 
                          ( <span> 
                            { line.indexOf('(0)')>0?<span style={{color:'red'}}>{line}</span>:line }
                            <br/> 
                            </span> 
                          ))
                      }
                    </td>
                    <td>
                      {
                        item.unit.split(',').map( line => 
                            ( <span> 
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