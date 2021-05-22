import React, { useState, useEffect, FunctionComponent } from "react";
import Table from "react-bootstrap/Table";

import TableItem from "./tableItem";
import Pagination from "../Shared/Pagination";

import { TableProps } from './models';

import styles from "./table.module.css";


const TableView: FunctionComponent<TableProps> = (props) => {
  const { userList, tableHeader, itemsPerPage } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    setInitialTableState();
  }, [userList]);

  const setInitialTableState = () => {
    setSearchQuery("");
    setPage(1);
    setSortKey("");
    const updatedUserList: Array<object> = [...userList];
    setItems(updatedUserList.slice(0, itemsPerPage));
  };

  const handleChangePage = (pageNumber: number) => {
    const updatedItems: Array<object> = [...userList];

    setItems(
      updatedItems.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      )
    );

    setPage(pageNumber);
    setSearchQuery("");
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);

    const updatedItems = [...userList];

    const filteredItems: Array<object> = [];

    const currestSetOfItems = updatedItems.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    currestSetOfItems.forEach((dataItem) => {
      if (
        dataItem.name &&
        dataItem.name.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        filteredItems.push(dataItem);
      }
    });

    setItems(filteredItems);
  };

  const handleSort = (key: string) => {
    const updatedItems = [...items];

    if (key !== sortKey) {
      setItems(ascSort(updatedItems)(key));
    } else {
      setItems(descSort(updatedItems)(key));
    }

    setSortKey(key === sortKey ? "" : key);
  };

  const ascSort = (list: any) => (key: any) =>
    list.sort(function (a: any, b: any) {
      return a[key] > b[key] ? 1 : -1;
    });

  const descSort = (list: any) => (key: any) =>
    list.sort(function (a: any, b: any) {
      return a[key] > b[key] ? -1 : 1;
    });

  return (
    <div className={styles.tableView}>
      <div className={styles.headerContainer}>
        <input
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={setInitialTableState}>Reset</button>
      </div>
      {items.length > 0 && (
        <Table>
          <thead>
            <tr>
              {Object.keys(tableHeader).map((key: any) => {
                return (
                  <th
                    onClick={() => {
                      handleSort(key);
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "lightgray";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    <div className={styles.headerItem}>
                      <span>{tableHeader[key]}</span>
                      <span
                        className={`${sortKey === key ? styles.sortIconActive : ""
                          } ${styles.sortIcon}`}
                      >
                        {">"}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => (
              <TableItem key={item.id} item={item} />
            ))}
          </tbody>
        </Table>
      )}
      {items.length === 0 && (
        <div className={styles.noRecord}>No record Found</div>
      )}
      <Pagination
        page={page}
        totalItems={userList.length}
        itemsPerPage={itemsPerPage}
        handleChange={handleChangePage}
      />
    </div>
  );
};

export default TableView;
