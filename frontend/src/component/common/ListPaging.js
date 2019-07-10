import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ListPaging = (props ) => {
    //console.log("PAGING")
    const {currentPage} = props.data
    //console.log("::::currentPage::::::"+currentPage);
    return  <Pagination aria-label="Page navigation example"> 
                {/* <PaginationItem disabled={currentPage <= 0}> */}
                <PaginationItem>
                    <PaginationLink previous href="#"  onClick={e => props.onPagingClick(e, currentPage - 1)} />
                </PaginationItem>

{/* 
                <PaginationItem >
                    <PaginationLink href="#" onClick={() => props.onPagingClick(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>

                {[...Array(pagesCount)].map((page, i) => 
                <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={e => props.onPagingClick(e, i)} href="#">
                    {i + 1}
                    </PaginationLink>
                </PaginationItem>
                )} */}
                <div style={{ margin: '5px 20px 0px 20px'  }} ><p className="font-weight-bold">{props.data.start_dt} ~ {props.data.end_dt}</p></div>
                {/* <PaginationItem disabled={currentPage >= pagesCount - 1}> */}
                <PaginationItem>  
                    <PaginationLink next href="#"  onClick={e => props.onPagingClick(e, currentPage + 1)} />
                </PaginationItem>
            </Pagination>
}

export default ListPaging;