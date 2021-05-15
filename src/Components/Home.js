import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./table.module.css";

import TableComponent from "./Table";

import { getList } from "../AppStore/actions";

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

const Home = (props) => {
  const { getList, userList } = props;

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div className={styles.container}>
      <TableComponent
        tableHeader={tableHeader}
        userList={userList}
        itemsPerPage={5}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.tableListReducer.userList || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
