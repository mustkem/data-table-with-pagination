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
        this.state = {
            sort: {
                default: false,
                first_name: false,
                last_name: false,
                company_name: false,
                city: false,
                state: false,
                zip: false,
                email: false,
                web: false,
                age: false
            },
            sortBy: 'default',
            search: ''
        }
    }

    componentDidMount() {
        this.props.getList();
        const query = parse(this.props.location.search);
        this.props.paginationFunc(query);
    }

    getUsers = () => {
        const sortBy = this.state.sortBy;
        const sortAsy = this.state.sort[sortBy];
        const start = perPage * (this.props.page - 1)
        const end = start + perPage;
        let userList = [...this.props.userList];
        const filteredUserList = userList.slice(start, end);
        const sortedArray = this.onSort(filteredUserList, sortBy, sortAsy);
        const filteredArray = this.onfilter(sortedArray);
        return filteredArray;
    }

    onfilter = (arr) => {
        return arr.filter(item => {
            let ret = false;
            if (item.first_name.includes(this.state.search)) {
                ret = true;
            }
            return ret;
        });
    }

    onSort = (arr, sortBy, sortAsy) => {

        let b_greater_a = -1;
        let a_greater_b = 1;
        if (!sortAsy) {
            b_greater_a = 1;
            a_greater_b = -1;
        }

        function compare(a, b) {
            if (a[sortBy] < b[sortBy]) {
                return b_greater_a;
            }
            if (a[sortBy] > b[sortBy]) {
                return a_greater_b;
            }
            return 0;
        }

        arr.sort(compare);
        return arr;
    }

    onClickSort = (key) => {
        let updatedSort = {};
        let sort = { ...this.state.sort }
        Object.keys(sort).forEach(ky => {
            let item = sort[key];
            if (key == ky) {
                item = !item
            } else {
                item = false;
            }
            updatedSort[ky] = item;
        })
        this.setState({
            sort: updatedSort,
            sortBy: key
        })
    }

    onChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="table-view">
                    <div className="search">
                        <input
                            placeholder="Search by First Name"
                            value={this.state.search}
                            onChange={(e) => { this.onChange(e, "search") }}
                        />
                        <span>
                            {
                                (perPage * (this.props.page - 1)) + ' - ' + (perPage * (this.props.page - 1) + perPage) + ' of ' + this.props.userList.length
                            }
                        </span>
                    </div>
                    <ul className="table">
                        <li className="list-item head clearfix">
                            <div onClick={(e) => { this.onClickSort('first_name') }} className="data-item first-name">
                                First Name
                                <i className={`${this.state.sort.first_name ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('last_name') }} className="data-item last-name">
                                Last Name
                                <i className={`${this.state.sort.last_name ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('company_name') }} className="data-item company-name">
                                Company Name
                                <i className={`${this.state.sort.company_name ? 'active' : ''}`} >^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('city') }} className="data-item city">
                                City
                                <i className={`${this.state.sort.city ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('state') }} className="data-item state">
                                State
                                <i className={`${this.state.sort.state ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('zip') }} className="data-item zip">
                                Zip
                                <i className={`${this.state.sort.zip ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('email') }} className="data-item email">
                                Email
                                <i className={`${this.state.sort.email ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('web') }} className="data-item web">
                                Web
                                <i className={`${this.state.sort.web ? 'active' : ''}`}>^</i>
                            </div>
                            <div onClick={(e) => { this.onClickSort('age') }} className="data-item age">
                                Age
                                <i className={`${this.state.sort.age ? 'active' : ''}`}>^</i>
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