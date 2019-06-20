
import React, { Component } from 'react';
import ReportForm from './ReportForm'; 
import List from '../component/common/List';

class ReportHome extends Component{
    state = {
        HEDER           : ["번호" ,"구분" ,"문서번호" ,"제목" ,"내용" ,"삭제"], //헤더는 항상 첫번째에 위치
        id              : "",
        gubun           : "",
        document_num    : "",
        title           : "",
        content         : "",
        LIST            : [],
        EDITING         : false
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:5000/weekly_report');
            const LIST = await res.json();
            console.log(LIST);
            this.setState({
                LIST :LIST
            });
        } catch (e) {
            console.log(e);
        }
    }

    handlerSelectRow = (rowData) =>{
        console.log("::rowData::");
        console.log(rowData);
        var form_id = Object.getOwnPropertyNames( rowData );
        console.log("::Object::");
        console.log(form_id);

        this.setState({EDITING : true, ...rowData ,FORM_ID : form_id});
     

    }

    handleCreate = (e) => {
        e.preventDefault()
        console.log(this.state)
   
        try {
            const {gubun ,title ,content ,document_num ,LIST} = this.state
            let form = new FormData() 
            form.append('gubun', gubun) 
            form.append('title', title) 
            form.append('content',content)
            form.append('document_num',document_num)
            
            const axios = require('axios');
            axios.post('http://127.0.0.1:5000/weekly_report_insert', form
            ).then(response => { 
                console.log(response);
                if(response.data ==='Y'){
                    this.setState({
                        id              : "",
                        gubun           : "",
                        document_num    : "",
                        title           : "",
                        content         : "",
                        LIST : LIST.concat({
                            gubun : gubun 
                           ,document_num : document_num
                           ,title : title 
                           ,content : content 
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
        const { EDITING } = this.state;

        this.setState({ EDITING: !EDITING });

        console.log(":::::initial::::::");
        // this.setState({
        //     gubun           : "",
        //     document_num    : "",
        //     title           : "",
        //     content         : ""
        // });
    }
    handleChange = (e ,data) => {
        console.log(e.target.id);
        // this.setState({
        //     [e.target.id] : e.target.value
        // });
        const { LIST } = this.state;
        console.log("data:::");
        this.setState({
            [e.target.id] : e.target.value
        });

     }
    handleRemove = (id) => { 
        console.log(id);
        const { LIST } = this.state;
        let form = new FormData() 
        form.append('id', id) 

        const axios = require('axios');
        axios.post('http://127.0.0.1:5000/weekly_report_delete', form
        ).then(response => { 
            console.log(response);
            if(response.data ==='Y'){
                this.setState({
                    LIST: LIST.filter(LIST => LIST.id !== id)
                });
            }else{
                alert('삭제 실패')
            }
        });
    }


    componentDidUpdate(prevProps, prevState) {
        // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
        // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
        // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
    
        const { LIST, onUpdate } = this.state;
        if(!prevState.EDITING && this.state.EDITING) {
          // editing 값이 false -> true 로 전환 될 때
          // info 의 값을 state 에 넣어준다
          console.log(':::::::componentDidUpdate1111111:::');
          this.setState({
            ...LIST
          })
        }
    
        if (prevState.EDITING && !this.state.EDITING) {
          // editing 값이 true -> false 로 전환 될 때
          console.log(':::::::componentDidUpdate2222222:::');
          onUpdate(LIST.id, {
            title: this.state.LIST.title,
            content: this.state.LIST.content
          });
        }
    }

    render(){
        return ( 
            <div>
               <ReportForm value={this.state} onChange={this.handleChange}  onCreate={this.handleCreate}  onUpdate={this.handleToggleEdit} />
               {/* {this.state.LIST.map(item => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <span>{item.content}</span> 
                    </div>
                ))}  */}
                { this.state.LIST.length > 0 ? (
                    <List data={this.state} onClick={this.handlerSelectRow} onRemove={this.handleRemove} />
                    ):(
                        <span>LOADING....</span>
                    )
                }                 
            </div>
        )
    }
}
export default ReportHome;
