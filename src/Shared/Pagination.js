import React from "react";

const Pagination = (props) => {
  const { page, handleChange, totalItems, itemsPerPage, showTotal } = props;

  const totalPages = Math.trunc(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <span>
        <span> {(page - 1) * itemsPerPage + 1}</span> -
        <span> {page * itemsPerPage}</span> of
        <span> {totalItems}</span>
      </span>
      <ul>
        <li>
          <button onClick={() => handleChange(1)}>{`<<`}</button>
        </li>
        <li>
          <button onClick={() => handleChange("index")}>{"<"}</button>
        </li>
        {[...Array(totalPages).keys()].map((pageItem, index) => {
          return (
            <li key={index + pageItem}>
              <button
                className={`${page === index + 1 ? "active" : ""} `}
                onClick={() => handleChange(index+1)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
        <li>
          <button onClick={() => handleChange("index")}>{">"}</button>
        </li>
        <li>
          <button onClick={() => handleChange(totalPages)}>{`>>`}</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
