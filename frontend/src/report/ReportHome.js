import React, { Component } from 'react';
import axios from 'axios';
import List from '../component/common/List';
import ListPaging from '../component/common/ListPaging';
import Table from 'react-bootstrap/Table';
import {Form ,Button  } from 'react-bootstrap';
import { Input } from 'reactstrap';
import Moment  from 'moment';
import '../App.css';
import DatePicker ,{registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getDay from "date-fns/getDay";
import ko from 'date-fns/locale/ko';
registerLocale('kr', ko)

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-daterangepicker/daterangepicker.css';
//import Calendar from 'react-calendar';
//import DatePicker from 'react-date-picker';


class ReportHome extends Component{
    state = {
        HEDER           : ["번호" ,"구분" ,"문서번호" ,"제목" ,"내용" ,"완료여부" ,"유형","삭제"], //헤더는 항상 첫번째에 위치
        H_WIDTH         : ["60","70","200","250","0","100","80","80"],//리스트 헤더의 width 값 헤더명 갯수 와 동일
        id              : "",
        gubun           : "",
        document_num    : "",
        title           : "",
        content         : "",
        localhost       : "26.2.111.149:5000",
        LIST            : [],
        date            : new Date(),
       // f_week          : 1 ,
        //pagesCount      : 5,
        currentPage     : Moment().weeks(),
        start_dt        : Moment().format('YYYY-MM-DD'),      
        end_dt          : "",
        EDITING         : false
    }

    isWeekday = date => {
        const day = getDay(date)
        return day !== 0 && day !== 6;
    }

    componentDidMount() {
        this.fncWeekDate(this.state.currentPage ,this.state.start_dt,"CAL")
    }

    fncWeekDate = (currentWeek ,datePicker ,gubun) =>{
        console.log("::dates 달력 선택 일자::");
        console.log(datePicker)
        //console.log(currentWeek);
        //console.log(Moment().week(25).format('YYYYMMDD'));
    
        let weeks = Moment(datePicker).week()

        if(gubun ==="BTN")//버튼클릭시
            weeks      = currentWeek
         

        //console.log("금요일 찾기 ::" + Moment().week(weeks-1).format('YYYYMMDD'));
        let v_startDate = ""
        let v_endDate   = ""
        let v_sDiff     = -1        
        let v_eDiff     = 0       

        if(Moment(datePicker).isoWeekday() >= 5){
            v_sDiff = 0
            v_eDiff = 1
        }
        
        v_startDate     = Moment(datePicker).isoWeekday(5).week(weeks +(v_sDiff)).format('YYYY-MM-DD')
        v_endDate       = Moment(datePicker).isoWeekday(4).week(weeks +(v_eDiff)).format('YYYY-MM-DD')
    
        this.handleReportList(weeks ,v_startDate ,v_endDate)
    }

    handleReportList = (weeks ,v_startDate ,v_endDate) => {
        try {

            this.setState({
                start_dt    : v_startDate,
                end_dt      : v_endDate,
                currentPage : weeks
            });

            let form = new FormData() 
            form.append('p_week',        weeks)
            form.append('p_month',       Moment(v_startDate).format('MM'))
            form.append('p_start_dt',    v_startDate.replace(/-/gi,""))  
            form.append('p_end_dt',      v_endDate.replace(/-/gi,"")) 
            axios.post('http://' + this.state.localhost + '/weekly_report', form
            ).then(response => { 
                console.log(response)
                this.setState({
                    LIST        : response.data.LIST,
                    statusText  : response.statusText,
                });
            });
        } catch (e) {
            console.log(e)
        }
    }

    handleReset = (e) => {
        e.preventDefault()
        this.setState({
            id                : "",
            f_gubun           : "",
            f_document_num    : "",
            f_title           : "",
            f_content         : "",
            f_complate        : "",
            f_type            : "",
            EDITING           : false
        })
    }

    handlerSelectRow = (rowData) =>{
        let form_id = Object.getOwnPropertyNames( rowData );
        this.setState({
            EDITING         : true,
            id              : rowData.id, 
            f_gubun         : rowData.gubun,
            f_document_num  : rowData.document_num,
            f_title         : rowData.title,
            f_content       : rowData.content,
            f_complate      : rowData.complate,
            f_type          : rowData.type,
             FORM_ID        : form_id
        });
     

    }

    handleCreate = (e) => {
        e.preventDefault()
        console.log(this.state)
        const {f_gubun ,f_title ,f_content ,f_document_num ,f_complate ,f_type 
            ,start_dt ,end_dt ,currentPage ,LIST} = this.state

        if(f_gubun ==='' || f_title ==='' || f_content ==='' 
            || f_document_num ==='' || f_complate ==='' || f_type ==='' ){
            alert('필수사항 미입력')
            return
        }

        try {
            let form = new FormData() 
            form.append('p_gubun',        f_gubun) 
            form.append('p_title',        f_title) 
            form.append('p_content',      f_content)
            form.append('p_document_num', f_document_num)
            form.append('p_complate',     f_complate)
            form.append('p_type',         f_type)

  
            form.append('p_week',         currentPage)

            form.append('p_month',       Moment(start_dt).format('MM'))
            form.append('p_start_dt',    start_dt.replace(/-/gi,""))  
            form.append('p_end_dt',      end_dt.replace(/-/gi,"")) 

            axios.post('http://' + this.state.localhost + '/weekly_report_insert', form
            ).then(response => { 
                console.log("::::response::::");
                console.log(response);
                if(response.data.result ==='Y'){
                    const v_insertId = response.data.insertId
                    this.setState({
                        id                : "",
                        f_gubun           : "",
                        f_document_num    : "",
                        f_title           : "",
                        f_content         : "",
                        f_complate        : "",
                        f_type            : "",
                        statusText        : response.statusText,
                        EDITING           : false,

                        LIST : LIST.concat({
                            id              : v_insertId,
                            gubun           : f_gubun,
                            document_num    : f_document_num,
                            title           : f_title,
                            content         : f_content,
                            complate        : f_complate,
                            type            : f_type 
                        })
                    })
                }else{
                    alert('등록 실패')
                }
            });
        } catch (e) {
            console.log(e);
        }      
    }

    handleToggleEdit = (e) => {
        const { EDITING  } = this.state;

        this.setState({ EDITING: !EDITING });
        console.log(":::::initial::::::");
        // this.setState({
        //     gubun           : "",
        //     document_num    : "",
        //     title           : "",
        //     content         : ""
        // });
    }

    handleChange = (e ) => {
        this.setState({
            [e.target.id] : e.target.value
        });
     }
    handleRemove = (id) => { 
        console.log(id);
        const { LIST } = this.state;

        let form = new FormData() 
        form.append('id', id) 

        axios.post('http://' + this.state.localhost + '/weekly_report_delete', form
        ).then(response => { 
            console.log(response);
            if(response.data ==='Y'){
                this.setState({
                    LIST        : LIST.filter(LIST => LIST.id !== id),
                    statusText  : response.statusText,
                });
            }else{
                alert('삭제 실패')
            }
        });
    }

    
    handleUpdate = (id,chgData) => {
        console.log(":::::handleUpdate::::::"+id);
        const { LIST } = this.state;
        
        //if(!EDITING)return

        let form = new FormData()
        form.append('id'              ,id)  
        form.append('p_gubun'         ,chgData.gubun) 
        form.append('p_title'         ,chgData.title) 
        form.append('p_content'       ,chgData.content)
        form.append('p_document_num'  ,chgData.document_num)
        form.append('p_complate'      ,chgData.complate)
        form.append('p_type'          ,chgData.type)

        axios.post('http://' + this.state.localhost + ':5000/weekly_report_update', form
        ).then(response => { 
            console.log("::::response:1::::")
            console.log(this.state)
            console.log(response)
            console.log("::::response:2::::")
            if(response.data.result ==='Y'){
              
                this.setState({
                    id                : "",
                    f_gubun           : "",
                    f_document_num    : "",
                    f_title           : "",
                    f_content         : "",
                    f_complate        : "",
                    f_type            : "",
                    statusText        : response.statusText,
                    EDITING           : false,
                    LIST: LIST.map(
                        LIST => id === LIST.id
                    ? { ...LIST, ...chgData } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                    : LIST // 기존의 값을 그대로 유지
                    )
                })
            }else{
                alert('수정 실패')
            }
        });

    }

    componentDidUpdate(prevProps, prevState) {
        // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
        // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
        // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
        console.log(':::prevState::');
        console.log(prevState);
        const { LIST,id ,f_week } = this.state;

        if(f_week !== prevState.f_week){
            console.log(":::GET LIST ::::")
            this.handleReportList()
        }

        if(!prevState.EDITING && this.state.EDITING) {
          // editing 값이 false -> true 로 전환 될 때
          // info 의 값을 state 에 넣어준다
          console.log(':::::::componentDidUpdate1111111:::')
          this.setState({
            ...LIST
          })
        }
    
        if (prevState.EDITING && !this.state.EDITING) { 
          // editing 값이 true -> false 로 전환 될 때
          console.log(':::::::componentDidUpdate2222222:::')
          if(!id)return

          this.handleUpdate(id,{
            gubun         : this.state.f_gubun,
            title         : this.state.f_title,
            content       : this.state.f_content,
            document_num  : this.state.f_document_num,
            complate      : this.state.f_complate,
            type          : this.state.f_type
          });
        }
    }

    //달력 선택시
    onDateChange = ( startDate) => {
        this.setState({date : startDate})
        function pad(num) {
            num = num + '';
            return num.length < 2 ? '0' + num : num;
        }
        let datePicker = startDate.getFullYear() + pad(startDate.getMonth()+1) + pad(startDate.getDate());
        this.setState({
            select_dt : datePicker
        })
        this.fncWeekDate(this.state.currentPage ,datePicker ,"CAL")

    }

    //버튼클릭시
    handlerPagingClick = (e ,index) =>{
        e.preventDefault();
        this.fncWeekDate(index ,this.state.select_dt , "BTN")
    }

    render(){
        const {f_gubun ,f_document_num ,f_title ,f_content ,f_complate ,f_type ,EDITING} = this.state
        const options = {week : [] ,gubun : [] ,complate : [] ,type : []}


        options.gubun.push(
            {name:'업무구분' ,value:''},
            {name:'CRESYS'  ,value:'CRESYS'},
            {name:'LMS'     ,value:'LMS'},
            {name:'MIS'     ,value:'MIS'}
        )

        options.complate.push(
            {name:'완료여부' ,value:''},
            {name:'진행중'   ,value:'진행중'},
            {name:'완료'     ,value:'완료'}
        )

        options.type.push(
            {name:'유형'     ,value:''},
            {name:'유지보수' ,value:'유지보수'},
            {name:'개선'     ,value:'개선'},
            {name:'개발'     ,value:'개발'}
        )

        options.week.push(
            {name:'1주차'     ,value:'1'},
            {name:'2주차'     ,value:'2'},
            {name:'3주차'     ,value:'3'},
            {name:'4주차'     ,value:'4'},
            {name:'5주차'     ,value:'5'}
        )

        const renderOptions = (optionsMap) => {
     
            return optionsMap.map((i) => {
                return <option key={i.value} value={i.value}>{i.name}</option>;
            });
        };

        return ( 
            <div style={{ width: '100%'}}>
                <div style={{ marginBottom: '15px' ,marginTop: '20px'}}>
                    {
                        (EDITING)?(
                            <Button variant="success" className="float-right"  onClick={this.handleToggleEdit} > 
                                수정
                            </Button>
                        ):(
                            <Button variant="primary" className="float-right"   onClick={this.handleCreate}  > 
                                저장
                            </Button>
                        )
                    }
                    {/* <LinkedCalendar onDatesChange={this.onDatesChange} showDropdowns={false} /> */}
                    <Button variant="secondary" className="float-right" style={{ marginRight: '5px'}}  onClick={this.handleReset}  > 
                        취소
                    </Button>
                    {/* <Calendar onChange={this.onDatesChange} value={this.state.date}  /> */}
                    <div style={{marginLeft : "20px" ,marginTop : "5px" ,float : "left"}}>
                        {/* <DatePicker  onChange={this.onDatesChange}  value={this.state.date} dateFormat="MM-yyyy" showMonthYearPicker/> */}
                        <DatePicker 
                                selected={this.state.date}
                                onChange={this.onDateChange}
                                filterDate={this.isWeekday}
                                dateFormat="yyyy/MM/dd"
                                locale="kr"
                            />
    
                    </div>
                    {/* <Form.Group controlId='f_week' style={{ width: '100px' ,marginLeft : "20px" ,float : "left"}}> 
                        <Form.Control as="select" className="fontSize_13" onChange={this.handleChange} value={this.state.f_week ||''} >
                            {renderOptions(options.week)}
                        </Form.Control> 
                    </Form.Group>  */}
                    {/* <div style={{ width: '40px'  ,marginLeft : "20px"   ,marginRight : "5px" ,marginTop : "5px" ,float : "left"}}>주차 : </div>
                    <div style={{ width: '200px' ,marginRight : "450px" ,marginTop : "15px" ,float : "right"}}>{this.state.start_dt} ~ {this.state.end_dt}</div> */}
                    <div style={{ width: '300px'  ,marginLeft : "300px"  ,float : "left"}} >
                        <ListPaging data={this.state} onPagingClick={this.handlerPagingClick} style={{ width: '300px'}}/> 
                    </div>
                </div>
                <Form > 
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                            <td style={{ width: '120px' ,textAlign : "center"}}>
                                <Form.Group controlId='f_gubun'> 
                                    <Form.Control as="select" className="fontSize_13"  onChange={this.handleChange} value={f_gubun ||''} >
                                        {renderOptions(options.gubun)}
                                    </Form.Control> 
                                </Form.Group>                            
                            </td>
                            <td style={{ width: '200px' ,textAlign : "center"}}>    
                                <Form.Group controlId="f_document_num">
                                    <Form.Control placeholder="문서번호" className="fontSize_13" onChange={this.handleChange}  value={f_document_num ||''} />
                                </Form.Group>
                            </td>
                            <td style={{ width: '300px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_title">
                                    <Form.Control placeholder="요청사항" className="fontSize_13" onChange={this.handleChange}  value={f_title ||''} />
                                </Form.Group>
                            </td>
                            <td style={{ width: '0px' ,textAlign : "center"}}>
                                <Form.Group>
                                    {/* <Form.Control placeholder="처리내용" className="fontSize_13" onChange={this.handleChange}  value={f_content ||''} /> */}
                                    <Input type="textarea" name="f_content" id="f_content"  placeholder="처리내용" className="fontSize_13" onChange={this.handleChange}  value={f_content ||''} />
                                </Form.Group>
                            </td>
                            <td style={{ width: '120px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_complate">
                                    <Form.Control as="select" placeholder="완료여부" className="fontSize_13" onChange={this.handleChange}  value={f_complate ||''} >
                                        {renderOptions(options.complate)}
                                    </Form.Control>
                                </Form.Group>
                            </td>
                            <td style={{ width: '80px' ,textAlign : "center"}}>
                                <Form.Group controlId="f_type">
                                    <Form.Control as="select" placeholder="유형" className="fontSize_13 width_75" onChange={this.handleChange}  value={f_type ||''} >
                                        {renderOptions(options.type)}
                                    </Form.Control>                                    
                                </Form.Group>
                            </td>                            
                        </tr>
                    </tbody>
                </Table>
                </Form > 

                { this.state.statusText==="OK" ? (
                    <List data={this.state} onRemove={this.handleRemove} onDoubleClick={this.handlerSelectRow} />
                    ):(
                        <span>LOADING....</span>
                    )
                }                 
            </div>
        )
    }
}
export default ReportHome; 