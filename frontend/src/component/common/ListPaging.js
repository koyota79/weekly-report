import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ListPaging = (props ) => {
    console.log("PAGING")
    const {pagesCount ,currentPage} = props.data
    return  <Pagination aria-label="Page navigation example"> 
                <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink previous href="#"  onClick={e => props.onPagingClick(e, currentPage - 1)} />
                </PaginationItem>


                {/* <PaginationItem >
                    <PaginationLink href="#" onClick={() => props.onPagingClick(1)}>
                        1
                    </PaginationLink>
                </PaginationItem> */}

                {[...Array(pagesCount)].map((page, i) => 
                <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={e => props.onPagingClick(e, i)} href="#">
                    {i + 1}
                    </PaginationLink>
                </PaginationItem>
                )}

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink next href="#"  onClick={e => props.onPagingClick(e, currentPage + 1)} />
                </PaginationItem>
            </Pagination>
}

export default ListPaging;