import React from 'react';
import {Form ,Col ,Button  } from 'react-bootstrap';


const ReportForm = ({value, onChange, onCreate, onKeyPress ,onUpdate ,onReset}) => {
    
  return (
    <Form > 
        <Form.Row>
            <Form.Group as={Col} onChange={onChange}  controlId="gubun" value={value.gubun ||''}>
            <Form.Label>구분</Form.Label>
            <Form.Control as="select">
                <option value='' selected={value.gubun ||''} >선택</option>
                <option value='CRESYS' selected={value.gubun ||''} >크레시스</option>
                <option value='LMS' selected={value.gubun ||''} >LMS</option>
                <option value='MIS' selected={value.gubun ||''} >MIS</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="document_num">
            <Form.Label>문서번호</Form.Label>
            <Form.Control onChange={onChange} onKeyPress={onKeyPress} value={value.document_num ||''}/>
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control placeholder="요청사항" onChange={onChange} onKeyPress={onKeyPress} value={value.title ||''} />
        </Form.Group>

        <Form.Group controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control placeholder="처리내용" onChange={onChange} onKeyPress={onKeyPress} value={value.content ||''} />
        </Form.Group>
 
        {/* 
        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
          <Button variant="primary" className="float-right" style={{ marginBottom: '20px' }}  onClick={onCreate}> 
        */}
        {value.EDITING?(
                <div>
                    <Button variant="success"  className="float-right" style={{ marginBottom: '20px' }}  onClick={onUpdate} > 
                    수정
                    </Button>
                    <Button variant="primary"  className="float-right" style={{ marginBottom: '20px' , marginRight: '10px'  }}  
                       type="reset"   onClick={onReset}> 
                    취소
                    </Button>
                </div>
            ):(
                <Button variant="primary" className="float-right" style={{ marginBottom: '20px' }}  onClick={onCreate}  > 
                저장
                </Button>
             
            )
        }
  
     
        <br/>
    </Form>
  );
};

export default ReportForm;