import React from 'react';
import Table from 'react-bootstrap/Table';                        
               

const MainYearly = (props ) => {   
    const info = props.data.info
    return info?(
                <div style={{display:'inline-block',marginLeft:'20px' ,width:'350px'}}>
                    <Table striped bordered hover size="sm" className='App'>
                        <colgroup>
                            <col width='120px'></col>
                        </colgroup>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th>파 트 명</th>
                                <td>
                                    {info.part_nm}
                                </td>
                            </tr>
                            <tr>
                                <th>이 름</th>
                                <td>
                                    {info.name}
                                </td>
                            </tr>
                            <tr>
                                <th colSpan='2' style={{textAlign:'center'}}>연 간 연 차</th>
                            </tr>
                            <tr>
                                <th>예정 일수</th>
                                <td>
                                    {info.total_day}일
                                </td>
                            </tr>
                            <tr>
                                <th>잔여 일수</th>
                                <td>
                                    {info.remain_day}일
                                </td>
                            </tr>
                            <tr>
                                <th>사용 일수</th>
                                <td>
                                    {info.use_day}일
                                </td>
                            </tr>                                                                                                                                                 
                        </tbody>
                    </Table>
                </div>
            ):(null)
}

export default MainYearly;