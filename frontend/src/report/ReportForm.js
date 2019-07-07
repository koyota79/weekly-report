import React from 'react';
import {Form ,Col ,Button ,Table } from 'react-bootstrap';
import { Input } from 'reactstrap';
import {cf_selectOptions} from '../component/common/CommonMethod';

const ReportForm = ({onChange ,props ,options }) => {
    
  const {f_gubun ,f_document_num ,f_title ,f_content ,f_complete ,f_type} = props
  return (
            <Form > 
                <Table striped bordered hover size="sm"  >
                    <tbody>
                        <tr>
                            <td style={{ width: '120px' ,textAlign : "center"}}>
                                <Form.Group controlId='f_gubun'> 
                                    <Form.Control as="select" className="fontSize_13"  onChange={onChange} value={f_gubun ||''} >
                                        {cf_selectOptions(options.gubun)}
                                    </Form.Control> 
                                </Form.Group>                            
                            </td>
                            <td style={{ width: '200px' ,textAlign : "center"}}>    
                                <Form.Group controlId="f_document_num">
                                    <Form.Control placeholder="문서번호" className="fontSize_13" onChange={onChange}  value={f_document_num ||''} />
                                </Form.Group>
                            </td>
                            <td style={{ width: '300px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_title">
                                {/* ref={(input) => { this.inputform = input; }} */}
                                    <Form.Control placeholder="요청사항"  className="fontSize_13" onChange={onChange}  value={f_title ||''} /> 
                                </Form.Group>
                            </td>
                            <td style={{ width: '0px' ,textAlign : "center"}}>
                                <Form.Group>                                    
                                    <Input type="textarea" name="f_content" id="f_content"   placeholder="처리내용" className="fontSize_13" onChange={onChange}  value={f_content ||''} />
                                </Form.Group>
                            </td>
                            <td style={{ width: '120px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_complete">
                                    <Form.Control as="select" placeholder="완료여부" className="fontSize_13" onChange={onChange}  value={f_complete ||''} >
                                        {cf_selectOptions(options.complete)}
                                    </Form.Control>
                                </Form.Group>
                            </td>
                            <td style={{ width: '100px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_type">
                                    <Form.Control as="select" placeholder="유형" className="fontSize_13 width_100" onChange={onChange}  value={f_type ||''} >
                                        {cf_selectOptions(options.type)}
                                    </Form.Control>                                    
                                </Form.Group>
                            </td>                            
                        </tr>
                    </tbody>
                </Table>
            </Form > 
  );
};

export default ReportForm;