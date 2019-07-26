import React from 'react';
import { Table } from 'reactstrap';

const UserInfoList = (props) => {

    return (
        <div style={{display:'flex'}}>
            <Table striped bordered hover size="sm">
                <colgroup>
                    <col width='120px'></col>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan='2' style={{textAlign:'center'}}>LMS 파트</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LMS</td>
                        <td>kim</td>
                    </tr>
                    <tr>
                        <td>LMS</td>
                        <td>lee</td>
                    </tr>                                                                                                                                              
                </tbody>
            </Table> 
            <Table striped bordered hover size="sm">
                <colgroup>
                    <col width='120px'></col>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan='2' style={{textAlign:'center'}}>모바일 파트</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LMS</td>
                        <td>kim</td>
                    </tr>
                    <tr>
                        <td>LMS</td>
                        <td>lee</td>
                    </tr>                                                                                                                                              
                </tbody>
            </Table> 
            <Table striped bordered hover size="sm">
                <colgroup>
                    <col width='120px'></col>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan='2' style={{textAlign:'center'}}>단위업무 파트</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LMS</td>
                        <td>kim</td>
                    </tr>
                    <tr>
                        <td>LMS</td>
                        <td>lee</td>
                    </tr>                                                                                                                                              
                </tbody>
            </Table>             
        </div>)
}

export default UserInfoList;