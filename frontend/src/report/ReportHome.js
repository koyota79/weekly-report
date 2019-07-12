import React, { Component } from 'react';
//import Config from 'react-native-config'
import axios from 'axios';
import List from '../component/common/List';
import {cf_fetchPost ,cf_getSelectCode ,cf_getDecodeToken} from '../component/common/CommonMethod';
import ListPaging from '../component/common/ListPaging';
//import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'; //Form  ,Table 
//import { Input } from 'reactstrap';
import Moment  from 'moment';
import '../App.css';
import DatePicker ,{registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getDay from "date-fns/getDay";
import { sessionService } from 'redux-react-session';

import ReportForm from './ReportForm';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ko from 'date-fns/locale/ko';
registerLocale('kr', ko)
//npm start .env.development REACT_APP_API_URL=26.2.111.149:5000

class ReportHome extends Component{
    constructor(props) {
        super(props)
        this.state =  {
            HEDER           : ["번호" ,"구분" ,"문서번호" ,"제목" ,"내용" ,"완료여부" ,"유형",""], //헤더는 항상 첫번째에 위치
            H_WIDTH         : ["60","70","200","300","0","100","80","80"],//리스트 헤더의 width 값 헤더명 갯수 와 동일
            numbering       : true,
            btn_use         : true,
            id              : "",
            gubun           : "",
            document_num    : "",
            title           : "",
            content         : "",
            old_id          : "",
            api_url         : process.env.REACT_APP_API_URL,
            LIST            : [],
            date            : new Date(),
            currentPage     : Moment().weeks(),
            start_dt        : Moment().format('YYYY-MM-DD'),      
            end_dt          : "",

            //복사할때 필요한 현재 셋팅값
            first_start_dt  : "",
            first_year      : "", 
            first_month     : "",
            first_week      : "",
            
            EDITING         : false
        }
    }

    componentWillMount() {
        const userSession = sessionService.loadUser();
                userSession.then(response => { 
                    console.log(':::::componentWillMount MAIN::::::')
                    const access_token = response.access_token
                    const {levels ,name ,part} = cf_getDecodeToken(access_token)
                    const {currentPage , start_dt} = this.state

                    let wkDateObj = {
                        'currentWeek'  : currentPage ,
                        'datePicker'   : start_dt ,
                        'gubun'        : 'CAL' ,
                        'session'      : {
                            'access_token' : access_token,
                            'props'        : this.props
                        }

                    }
                    this.setState({
                        user_levels  : levels ,
                        user_name    : name ,
                        user_part    : part,
                        session      : wkDateObj.session
                    })

                    this.fncWeekDate(wkDateObj)
                    this.handleSelectOptions(part)
                    console.log(this.props)

                }
            )
    }  

    isWeekday = date => {
        const day = getDay(date)
        return day !== 0 && day !== 6;
    }

    componentDidMount() {
        console.log(this.props)
        //this.handleSelectOptions()
        //this.initializeUserInfo()
        //setTimeout(() => {
            //this.fncWeekDate(this.state.currentPage ,this.state.start_dt,"CAL")
            //this.handleSelectOptions()
        //}, 500)
    }

    handleSelectOptions(user_part){
        //const {user_part} = this.state //info.part
        let query = {'type':'SELECT' ,'menu':'REPORT','url':this.state.api_url + '/getSelectBox'}
        const selectOptions = cf_getSelectCode(query);
        console.log('::::::handleSelectOptions:::::::::')
        console.log(this.state)
        try{
            selectOptions.then(result => {
                    result.json().then(json => { 
                    console.log(json)
                    if(json.result ==='Y'){
                        const v_optionsObj  = json.LIST
                        const v_selectObj   = {COMPLETE :[] ,GUBUN :[] ,TYPE :[] ,WEEK :[]}
                        for (let k = 0; k < v_optionsObj.length; k++) { 
                            //console.log(v_optionsObj[k]); 
                            let class_nm = '';
                                class_nm = v_optionsObj[k].class
                            let v_name   = v_optionsObj[k].name 
                            let v_value  = v_optionsObj[k].value 
                            let v_part   = v_optionsObj[k].part 

                            if(class_nm ==='GUBUN'){  //업부구분                              
                                    if(v_part === user_part || v_part === 'ALL' ) //해당하는 파트 리스트만
                                        v_selectObj[class_nm].push({'name' : v_name ,'value' : v_value })
                            }else{
                                v_selectObj[class_nm].push({'name' : v_name ,'value' : v_value })
                            } 
                        }                    
                        //console.log(v_selectObj)
                        this.setState({
                            selectOptions : v_selectObj
                        })
                    }else{
                        alert(json.info.message)
                    } 
                }).catch(err => console.log(err)); 
            })
        }catch(e){
            console.log(e)
        }

    }

    fncWeekDate = (wkDateObj) =>{
        let {currentWeek ,datePicker ,gubun ,session} = wkDateObj
        console.log("::dates 달력 선택 일자::");
        let weeks = Moment(datePicker).week()
 
        if(gubun ==="BTN")//버튼클릭시
            weeks = currentWeek
         

        //console.log("금요일 찾기 ::" + Moment().week(weeks-1).format('YYYYMMDD'));
        let v_startDate = ""
        let v_endDate   = ""
        let v_sDiff     = -1//시작일 초기값 (현재날짜의 지난주를 찾기위해 -1)        
        let v_eDiff     = 0 //종료일 초기값      

        if(Moment(datePicker).isoWeekday() >= 5 && Moment(datePicker).isoWeekday() < 7){
            v_sDiff = 0
            v_eDiff = 1
        }
        
        v_startDate     = Moment(datePicker).isoWeekday(5).week(weeks +(v_sDiff)).format('YYYY-MM-DD')//금요일
        v_endDate       = Moment(datePicker).isoWeekday(4).week(weeks +(v_eDiff)).format('YYYY-MM-DD')//목요일

        this.handleReportList(weeks ,v_startDate ,v_endDate ,session)
    }

    handleReportList = (weeks ,v_startDate ,v_endDate ,session) => {
        try {
            function getWeekNo(v_date_str) {
                var date = new Date();
                if(v_date_str){
                 date = new Date(v_date_str);
                }
                return Math.ceil(date.getDate() / 7);
            }

            let v_weekState = 0
            let v_currentWeeks  = Moment().isoWeekday(5).week()
            let v_prevWeek      = Moment(v_startDate).isoWeekday(5).week()//시작일이 지난주
            if(v_prevWeek > v_currentWeeks ){//현재주차보다 많으면
                v_weekState = v_weekState + 1
            }else if(v_prevWeek < v_currentWeeks){
                v_weekState = v_weekState - 1
            }


            //console.log(weeks + '::::v_weekState::::::'+v_weekState + ':::::::::::::' + v_currentWeeks)
            let v_currWeek  = getWeekNo(v_startDate)
            let v_year      = Moment(v_startDate).format('YYYY')
            let v_month     = Moment(v_startDate).format('MM')

            const { first_start_dt ,first_year ,first_month ,first_week } = this.state;
            this.setState({
                start_dt        : v_startDate,
                end_dt          : v_endDate,
                currentPage     : weeks,
                currentWeek     : v_currWeek,
                nowWeek         : v_weekState,

                first_start_dt  : first_start_dt?first_start_dt:v_startDate,
                first_year      : first_year?first_year:v_year,
                first_month     : first_month?first_month:v_month,
                first_week      : first_week?first_week:weeks
            });

            console.log("첫시작날짜  ::"+v_startDate)
            let form = new FormData() 
            form.append('p_year',        v_year)
            form.append('p_month',       v_month)
            form.append('p_week',        v_currWeek)
            form.append('p_start_dt',    v_startDate.replace(/-/gi,""))  
            form.append('p_end_dt',      v_endDate.replace(/-/gi,"")) 
            form.append('url',           this.state.api_url + '/weekly_report') 

            cf_fetchPost(form ,session?session:this.state.session).then(result => {
                result.json().then(json => 
                    this.setState({
                        LIST        : json.LIST,
                        statusText  : 'OK',
                    }) 
                ).catch(err => console.log(err));              
            }).catch(err => console.log(err));

        } catch (e) {
            alert(e)
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
            f_complete        : "",
            f_type            : "",
            EDITING           : false
        })
    }

    handlerSelectRow = (rowData) =>{
        let form_id = Object.getOwnPropertyNames( rowData );
        //console.log(this.textInput)
        this.setState({
            EDITING         : true,
            id              : rowData.id, 
            f_gubun         : rowData.gubun,
            f_document_num  : rowData.document_num,
            f_title         : rowData.title,
            f_content       : rowData.content,
            f_complete      : rowData.complete,
            f_type          : rowData.type,
            FORM_ID         : form_id
        });
    }

    handleCreate = (e) => {
        try {
            e.preventDefault()
            const {f_gubun ,f_title ,f_content ,f_document_num ,f_complete ,f_type 
                ,start_dt ,end_dt ,currentWeek ,LIST ,api_url ,session} = this.state

            if(f_gubun ==='' || f_title ==='' || f_content ==='' 
                || f_document_num ==='' || f_complete ==='' || f_type ==='' ){
                alert('필수사항 미입력')
                return
            }

            let form = new FormData() 
            form.append('p_gubun',        f_gubun) 
            form.append('p_title',        f_title) 
            form.append('p_content',      f_content)
            form.append('p_document_num', f_document_num)
            form.append('p_complete',     f_complete)
            form.append('p_type',         f_type)

            form.append('p_week',        currentWeek)
            form.append('p_year',        Moment(start_dt).format('YYYY'))
            form.append('p_month',       Moment(start_dt).format('MM'))
            form.append('p_start_dt',    start_dt.replace(/-/gi,""))  
            form.append('p_end_dt',      end_dt.replace(/-/gi,"")) 
            form.append('url',           api_url + '/weekly_report_insert')

            cf_fetchPost(form ,session).then(result => {
                //console.log(result)
                if(result.ok){
                    result.json().then(json => 
                        this.setState({
                            id                : "",
                            f_gubun           : "",
                            f_document_num    : "",
                            f_title           : "",
                            f_content         : "",
                            f_complete        : "",
                            f_type            : "",
                            statusText        : 'OK',
                            EDITING           : false,

                            LIST : LIST.concat({
                                id              : json.insertId,
                                gubun           : f_gubun,
                                document_num    : f_document_num,
                                title           : f_title,
                                content         : f_content,
                                complete        : f_complete,
                                type            : f_type 
                            })
                        })
                    )
                }else{
                    result.json().then(json => alert(json.msg))
                }
            }).catch(err => console.log(err))
        } catch (e) {
            alert(e);
        }      
    }

    handleToggleEdit = () => {
        const { EDITING  } = this.state;
        this.setState({ EDITING: !EDITING });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleRemove = (id) => { 
        try{
            const { LIST } = this.state;
            let form = new FormData() 
            form.append('id', id) 
            axios.post(this.state.api_url + '/weekly_report_delete', form
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
        } catch (e) {
            alert(e)
        }
    }
 
    handleUpdate = (id,chgData) => {
        try{
            const { LIST } = this.state;
            let form = new FormData()
            form.append('id'              ,id)  
            form.append('p_gubun'         ,chgData.gubun) 
            form.append('p_title'         ,chgData.title) 
            form.append('p_content'       ,chgData.content)
            form.append('p_document_num'  ,chgData.document_num)
            form.append('p_complete'      ,chgData.complete)
            form.append('p_type'          ,chgData.type)

            axios.post(this.state.api_url + '/weekly_report_update', form
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
                        f_complete        : "",
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
        } catch (e) {
            alert(e)
        }
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
            complete      : this.state.f_complete,
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
            select_dt   : datePicker 
        })

        let wkDateObj ={
            'currentWeek' : this.state.currentPage ,
            'datePicker'  : datePicker,
            'gubun'       : "CAL"
        }

        this.fncWeekDate(wkDateObj)
    }

    //버튼클릭시
    handlerPagingClick = (e ,index) =>{
        e.preventDefault();
        let wkDateObj ={
            'currentWeek' : index ,
            'datePicker'  : this.state.select_dt,
            'gubun'       : "BTN"
        }
        this.fncWeekDate(wkDateObj)
    }

    //버튼클릭시
    handlerReportCopy = (index) =>{
        try {
            const {first_start_dt ,first_year ,first_month ,first_week ,api_url ,session } = this.state

            let form = new FormData() 
            form.append('p_id',             index)
            form.append('p_year',           first_year)
            form.append('p_month',          first_month)
            form.append('p_first_start_dt', first_start_dt.replace(/-/gi,"")) 
            form.append('p_week',           first_week)   
            form.append('url',              api_url + '/weekly_report_copy')

            cf_fetchPost(form ,session).then(result => {
                if(result.ok){
                    result.json().then(json => 
                        alert(json.message)
                    )
                }else{
                    result.json().then(json => alert(json.msg))
                }
            }).catch(err => console.log(err))
        } catch (e) {
            alert(e);
        }    
        
    }

    render(){
        const {EDITING } = this.state //f_gubun ,f_document_num ,f_title ,f_content ,f_complete ,f_type ,
        //const options = {week : [] ,gubun : [] ,complete : [] ,type : []}
        console.log("::REPORT::")

        //this.initComponent()
        // options.gubun.push(
        //     {name:'업무구분' ,value:''},
        //     {name:'CRESYS'  ,value:'CRESYS'},
        //     {name:'LMS'     ,value:'LMS'},
        //     {name:'MIS'     ,value:'MIS'}
        // )

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
                    <Button variant="secondary" className="float-right" style={{ marginRight: '5px'}}  onClick={this.handleReset}  > 
                        취소
                    </Button>
                    <div style={{marginLeft : "20px" ,marginTop : "5px" ,float : "left"}}>
                        <DatePicker selected={this.state.date} onChange={this.onDateChange} filterDate={this.isWeekday} dateFormat="yyyy/MM/dd"
                                locale="kr" />
                    </div>

                    <div style={{ width: '300px'  ,marginLeft : "300px"  ,float : "left"}} >
                        <ListPaging data={this.state} onPagingClick={this.handlerPagingClick} style={{ width: '300px'}}/> 
                    </div>
                </div>
                <ReportForm onChange={this.handleChange} props={this.state} ref={this.textInput} />
                { this.state.statusText==="OK" ? (
                    <List data={this.state} onRemove={this.handleRemove} onReportCopy={this.handlerReportCopy} onDoubleClick={this.handlerSelectRow} />
                    ):(
                        <span>LOADING....</span>
                    )
                }                 
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
});
  
const mapDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(sessionActions, dispatch) 
    };
};

export default connect(mapState, mapDispatch)(ReportHome);