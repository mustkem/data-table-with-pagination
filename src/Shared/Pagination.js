import React, { Component } from 'react';
import { connect } from "react-redux";
import { recordsPerPagePagination as perPage, numberOfPaginationButtons } from "../appConfig";
import { path } from 'ramda';
import { withRouter } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { paginationFunc } from "../AppStore/actions";


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    pageClick = (pageNumber, current) => {
        if (!current) {
            const query = parse(this.props.location.search);
            query.page = pageNumber;
            this.props.history.push('/?' + stringify(query))
            this.props.paginationFunc(query);
            // window.scrollTo(0, 0);
        }
    }

    render() {

        const currentPage = parseInt(this.props.page);
        const totalRecords = this.props.userList.length;
        const totalPages = totalRecords / perPage;
        const totalButtons = this.props.page + numberOfPaginationButtons - 1;
        const nextRemainingPagesToShow = totalPages - currentPage;
        const beforeRemainingPagesToShow = currentPage - 1;
        // console.log(nextRemainingPagesToShow);

        let start = this.props.page;
        let end;
        const tempArr = [];
        const halfOfTotalButtons = parseInt(numberOfPaginationButtons / 2);

        // console.log(halfOfTotalButtons)

        if (currentPage <= halfOfTotalButtons) {
            start = 1;
            end = numberOfPaginationButtons
        }

        if (currentPage > halfOfTotalButtons) {
            start = currentPage - halfOfTotalButtons;
            end = currentPage + (halfOfTotalButtons > nextRemainingPagesToShow ? nextRemainingPagesToShow : halfOfTotalButtons);
        }


        for (let i = start; i <= end; i++) {
            tempArr.push(<li key={i} >
                <button onClick={() => this.pageClick(i, currentPage === i)} className={(currentPage === i) ? "active" : ""}>{i}</button>
            </li>);
        }


        return (
            <div className="pagination">
                <div className="prev-next">
                    <button
                        disabled={`${this.props.page <= 1 ? "disabled" : ""}`}
                        className={`button ${this.props.page <= 1 ? "disable" : ""}`}
                        onClick={() => this.pageClick(this.props.page - 1, false)}>
                        Previous
                    </button>
                    <button
                        disabled={`${this.props.page >= totalPages ? "disabled" : ""}`}
                        className={`button ${this.props.page >= totalPages ? "disable" : ""}`}
                        onClick={() => this.pageClick(this.props.page + 1, false)}>
                        Next
                </button>
                </div>
                <ul>
                    <li>
                        <button
                            disabled={`${this.props.page <= halfOfTotalButtons ? "disabled" : ""}`}
                            className={`button ${this.props.page <= halfOfTotalButtons ? "disable" : ""}`}
                            onClick={() => this.pageClick(this.props.page - halfOfTotalButtons, false)}>
                            {
                                `<<`
                            }
                        </button>

                    </li>
                    {
                        tempArr
                    }
                    <li>
                        <button
                            disabled={`${this.props.page > nextRemainingPagesToShow + 2 ? "disabled" : ""}`}
                            className={`button ${this.props.page > nextRemainingPagesToShow + 2 ? "disable" : ""}`}
                            onClick={() => this.pageClick(this.props.page + halfOfTotalButtons, false)}>
                            {
                                `>>`
                            }
                        </button>
                    </li>
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userList: path(["tableListReducer", "userList"], state) ? path(["tableListReducer", "userList"], state) : [],
        page: parseInt(path(["tableListReducer", "page"], state))
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        paginationFunc: (query) => dispatch(paginationFunc(query)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagination));