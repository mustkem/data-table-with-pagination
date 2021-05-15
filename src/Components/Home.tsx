import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import TableComponent from "./Table";

import { getList } from "../AppStore/actions";

import { HomeProps, TableHeader } from './models'

import styles from "./table.module.css";


const tableHeader: TableHeader = {
  id: "User ID",
  name: "Name",
  email: "Email",
  username: "Username",
  website: "Website",
  phone: "Phone",
  city: "City",
  company: "Company",
};


const Home: FunctionComponent<HomeProps> = (props) => {
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

const mapStateToProps = (state: any) => {
  return {
    userList: state.tableListReducer.userList || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getList: () => dispatch(getList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
