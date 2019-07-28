import React from 'react';
import { Table } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 

//yarn add react-html-parser
//class ReportMngMemberList extends React.Component {
  //render() { 
const ReportMngMemberList = ({data ,onClick} ) => {
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
                        item.lms?item.lms.split(',').map( (line,j) => 
                          ( <span key={j}> 
                              { line.indexOf('(0)')>0?<span style={{color:'red'}}>{ReactHtmlParser(line)}</span>:ReactHtmlParser(line) }
                              <br/> 
                            </span> 
                          )):(null)
                      }
                    </td>
                    <td>
                      {
                        item.mobile?item.mobile.split(',').map( (line,j) => 
                          ( <span key={j} > 
                             { line.indexOf('(0)')>0?<span style={{color:'red'}}>{ReactHtmlParser(line)}</span>:ReactHtmlParser(line) }
                            <br/> 
                            </span> 
                          )):(null)
                      }
                    </td>
                    <td>
                      {
                        item.unit?item.unit.split(',').map( (line,j) => 
                            ( <span key={j} > 
                              { line.indexOf('(0)')>0?<span style={{color:'red'}}>{ReactHtmlParser(line)}</span>:ReactHtmlParser(line) }
                              <br/> 
                              </span> 
                            )):(null)
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