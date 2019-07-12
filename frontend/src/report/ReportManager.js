import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
import List from '../component/common/List';
import {cf_fetchPost ,cf_getDecodeToken} from '../component/common/CommonMethod';
import Moment  from 'moment';
import ListPaging from '../component/common/ListPaging';
//import ko from 'date-fns/locale/ko';
//registerLocale('kr', ko)

class ReportManager extends Component{
    constructor(props) {
        super(props)
        this.state =  {
            HEDER           : ["성명" ,"담당업무" ,"시스템명" ,"문서번호" ,"제목" ,"처리내역" ,"완료여부" ,"유형","출퇴근"], //헤더는 항상 첫번째에 위치
            H_WIDTH         : ["60","70","70","200","250","0","100","80","80"],//리스트 헤더의 width 값 헤더명 갯수 와 동일
            api_url         : process.env.REACT_APP_API_URL,
            LIST            : [],
            currentPage     : Moment().weeks(),
            start_dt        : Moment().format('YYYY-MM-DD'),    
        }
    }

    componentWillMount() {
        const userSession = sessionService.loadUser();
              userSession.then(response => { 
                    console.log('::::ReportManager componentWillMount:::::')
                    console.log(response)
                    const access_token = response.access_token
                    const {levels ,name ,part} = cf_getDecodeToken(access_token)
                    const {currentPage , start_dt} = this.state

                    let reportMngObj = {
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
                        session      : reportMngObj.session
                    })  
                    this.fncWeekDate(reportMngObj)
                  
                }
        )
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

        this.handleReportMngList(weeks ,v_startDate ,v_endDate ,session)
    }

    handleReportMngList = (weeks ,v_startDate ,v_endDate ,session) => {
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
            let v_year      = Moment(v_startDate).format('YYYY')
            let v_month     = Moment(v_startDate).format('MM')

            this.setState({
                start_dt        : v_startDate,
                end_dt          : v_endDate,
                currentPage     : weeks,
                currentWeek     : v_currWeek
            });

            //const {session} = reportMngObj.session
            let form = new FormData() 
            form.append('p_start_dt',    this.state.start_dt.replace(/-/gi,""))  
            form.append('url',           this.state.api_url + '/report_manager') 

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

    render(){
        console.log("ReportManager")
        console.log(this.props)
        return ( 
            <div>
                    <div style={{ width: '300px'  ,marginLeft : "300px"  ,float : "left"}} >
                        <ListPaging data={this.state} onPagingClick={this.handlerPagingClick} style={{ width: '300px'}}/> 
                    </div>
                <div>
                    { this.state.statusText==="OK" ? (
                        <List data={this.state} onRemove={null} onReportCopy={null} onDoubleClick={null} />
                        ):(
                            <span>LOADING....</span>
                        )
                    } 
                </div>               
            </div>
        )
    }
}

export default ReportManager