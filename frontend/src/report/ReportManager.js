import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
import List from '../component/common/List';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {cf_fetchPost ,cf_getDecodeToken ,cf_fetchPost2} from '../component/common/CommonMethod';
import Moment  from 'moment';
import getDay from "date-fns/getDay";
import ListPaging from '../component/common/ListPaging';
import DatePicker ,{registerLocale} from 'react-datepicker';
import {MemberListCnt} from './ReportMngMemberList';
import * as sessionActions  from '../action/SessionActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ko from 'date-fns/locale/ko';
registerLocale('kr', ko)

class ReportManager extends Component{
    constructor(props) {
        super(props)
        this.state =  {
            HEDER           : ["시스템명" ,"성명" ,"담당업무" ,"문서번호" ,"제목" ,"처리내역" ,"완료여부" ,"유형","이슈사항"], //헤더는 항상 첫번째에 위치
            H_WIDTH         : ["80","70","70","200","250","0","100","80","100"],//리스트 헤더의 width 값 헤더명 갯수 와 동일
            api_url         : process.env.REACT_APP_API_URL,
            LIST            : [],
            LIST_SUB        : [],
            date            : new Date(),            
            currentPage     : Moment().weeks(),
            value           : true,
            start_dt        : Moment().format('YYYY-MM-DD')
        }
    }

    componentWillMount() {

        const {currentPage , start_dt} = this.state
        let reportMngObj = {
            'currentWeek'  : currentPage ,
            'datePicker'   : start_dt ,
            'gubun'        : 'CAL'                        

        } 
        this.fncWeekDate(reportMngObj)        
    }   

    isWeekday = date => {
        const day = getDay(date)
        return day !== 0 && day !== 6;
    }

    fncWeekDate = (wkDateObj) =>{
        let {currentWeek ,datePicker ,gubun} = wkDateObj
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
        this.fnGetBtnState(v_startDate)
        this.handleReportMngList(weeks ,v_startDate ,v_endDate)
    }

    handleReportMngList = (weeks ,v_startDate ,v_endDate) => {
        try {

            function getWeekNo(v_date_str) {
                var date = new Date();
                if(v_date_str){
                 date = new Date(v_date_str);
                }
                return Math.ceil(date.getDate() / 7);
            }

            //console.log(weeks + '::::v_weekState::::::'+v_weekState + ':::::::::::::' + v_currentWeeks)
            let v_currWeek  = getWeekNo(v_startDate)
            let form = new FormData() 
            form.append('p_start_dt',    v_startDate.replace(/-/gi,""))  
            form.append('url',           this.state.api_url + '/report_manager') 

            cf_fetchPost2(form ,this.props).then(result => {
                result.json().then(json => 
                    this.setState({
                        LIST            : json.LIST,
                        LIST_SUB        : json.LIST_SUB,
                        statusText      : 'OK',

                        start_dt        : v_startDate,
                        end_dt          : v_endDate,
                        currentPage     : weeks,
                        currentWeek     : v_currWeek,

                        value           : !this.state.value
                    }) 
                ).catch(err => console.log(err));              
            }).catch(err => console.log(err));
           
        } catch (e) {
            alert(e)
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

    //리포트 마감
    handlerCloseReport = (e) => {
        e.preventDefault();
        const {start_dt ,api_url ,isToggleOn} = this.state

        let form = new FormData() 
        form.append('p_started',    start_dt.replace(/-/gi,""))
        form.append('p_closeYn',     isToggleOn?'N':'Y')    
        form.append('url',           api_url + '/weekly_report_close') 

        cf_fetchPost2(form ,this.props).then(result => {
            result.json().then(json => {  
                if(json.result === 'Y'){
                    alert(json.message)
                    this.setState(({
                        isToggleOn: json.close_yn==='Y'?true:false ,
                        value     : !this.state.value
                    }))
                }else(
                    alert(json.message)
                )
            }).catch(err => console.log(err));              
        }).catch(err => console.log(err));

    }


    componentDidUpdate(prevProps, prevState) {
        // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
        // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
        // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
        const { f_week } = this.state;

        if(f_week !== prevState.f_week){
            console.log(":::GET LIST ::::")
            this.handleReportList()
        }

        if(!prevState.EDITING && this.state.EDITING) {
          // editing 값이 false -> true 로 전환 될 때
          // info 의 값을 state 에 넣어준다
          console.log(':::::::componentDidUpdate1111111:::')
        }
    
        if (prevState.EDITING && !this.state.EDITING) { 
          // editing 값이 true -> false 로 전환 될 때
          console.log(':::::::componentDidUpdate2222222:::')
        }
    }

    //마감버튼 체크
    fnGetBtnState(v_started){
        const {api_url} = this.state   
        axios.get(api_url + '/report_btn_status', {params : {'p_started' : v_started.replace(/-/gi,"")}}
        ).then(response => {
            const {result ,message ,close_yn} = response.data
            if(result !== 'Y'){
                alert(message)
                return 
            }else{
                this.setState({isToggleOn : close_yn==='Y'?true:false})
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.value !== nextState.value;
    }

    render(){
        console.log("ReportManager")
        //console.log(this.props)
        return ( 
            <div style={{ width: '100%'}}>
                    <div>
                        <MemberListCnt data={this.state}/>
                    </div>
                    <div style={{marginTop : "20px"}}>
                        <div style={{marginLeft : "20px" ,float : "left"}}>
                            <DatePicker selected={this.state.date} onChange={this.onDateChange} filterDate={this.isWeekday} dateFormat="yyyy/MM/dd"
                                    locale="kr" />
                        </div>                
                        <div style={{ width: '300px'  ,marginLeft : "380px"  ,float : "left"}} >
                            <ListPaging data={this.state} onPagingClick={this.handlerPagingClick}/> 
                        </div>
                        <div style={{ width: '100px'  ,marginRight : "50px"  ,float : "right"}}>
                            <Button variant={this.state.isToggleOn ? 'danger' : 'primary'} className="float-right"  onClick={this.handlerCloseReport}  > 
                                {this.state.isToggleOn ? '마감취소' : '마감'}
                            </Button>
                        </div>
                    </div>

                    { this.state.statusText==="OK" ? (
                        <List data={this.state} onRemove={null} onReportCopy={null} onDoubleClick={null} />
                        ):(
                            <div style={{ paddingTop : '100px'}}>LOADING....</div>
                        )
                    }              
            </div>
        )
    }
}

//export default ReportManager

const mapState = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
});
  
const mapDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(sessionActions, dispatch) 
    };
};

export default connect(mapState, mapDispatch)(ReportManager);