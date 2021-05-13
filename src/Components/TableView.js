import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import Table from "react-bootstrap/Table";

import { getList } from "../AppStore/actions";
import TableItem from "./tableItem";
import { recordsPerPagePagination as perPage } from "../appConfig";
import Pagination from "../Shared/Pagination";
import styles from "./table.module.css";

const tableHeader = {
  id: "User ID",
  name: "Name",
  email: "Email",
  username: "Username",
  website: "Website",
  phone: "Phone",
  city: "City",
  company: "Company",
};

const TableView = (props) => {
  const { getList, userList, page } = props;
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    getList();
    const query = parse(location.search);
  }, [getList]);

  useEffect(() => {
    const updatedUserList = [...userList];
    setItems([...updatedUserList.splice(0, itemsPerPage)]);
  }, [userList]);

  const handleChangePage = (pageNumber) => {
    setItems(
      userList.splice(
        (pageNumber - 1) * itemsPerPage + 1,
        pageNumber * itemsPerPage
      )
    );

    // const query = parse(this.props.location.search);
    // query.page = pageNumber;
    // this.props.history.push('/?' + stringify(query))
  };

  return (
    <div className={styles.container}>
      <div className="table-view">
        <div className="search">
          <input
            placeholder="Search by First Name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          
        </div>
        <Table>
          <thead>
            <tr>
              {Object.keys(tableHeader).map((key) => {
                return <th>{tableHeader[key]}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <TableItem key={item.id} item={item} index={index} />
            ))}
          </tbody>
        </Table>
        <Pagination
          page={page}
          totalItems={userList.length}
          itemsPerPage={itemsPerPage}
          showTotal
          handleChange={handleChangePage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.tableListReducer.userList || [],
    page: state.tableListReducer.page,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
