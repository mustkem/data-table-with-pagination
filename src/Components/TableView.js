import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import { parse } from 'query-string';


import { getList, paginationFunc } from '../AppStore/actions';
import TableItem from './tableItem';
import { recordsPerPagePagination as perPage } from "../appConfig";
import Pagination from '../Shared/Pagination';

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.getList();
        const query = parse(this.props.location.search);
        this.props.paginationFunc(query);
    }

    getUsers = () => {
        const start = perPage * (this.props.page - 1)
        const end = start + perPage;
        let userList = [...this.props.userList];
        let filteredUserList = userList.slice(start, end);
        return filteredUserList;
    }

    render() {
        return (
            <div className="container">
                <div className="table-view">
                    <ul className="table">
                        <li className="list-item head clearfix">
                            <div className="data-item first-name">
                                First Name
                            </div>
                            <div className="data-item last-name">
                                Last Name
                            </div>
                            <div className="data-item company-name">
                                Company Name
                            </div>
                            <div className="data-item city">
                                City
                            </div>
                            <div className="data-item state">
                               State
                            </div>
                            <div className="data-item zip">
                                Zip
                            </div>
                            <div className="data-item email">
                                Email
                            </div>
                            <div className="data-item web">
                               Web
                            </div>
                            <div className="data-item age">
                                Age
                            </div>
                        </li>
                        {
                            this.getUsers().map((item, index) => <TableItem
                                key={item.id}
                                item={item}
                                index={index}
                            />)
                        }
                    </ul>
                    <Pagination />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userList: path(["tableListReducer", "userList"], state) ? path(["tableListReducer", "userList"], state) : [],
        page: path(["tableListReducer", "page"], state)

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => dispatch(getList()),
        paginationFunc: (query) => dispatch(paginationFunc(query)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView);