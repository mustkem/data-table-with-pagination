import React from "react";

const Pagination = (props) => {
  const { page, handleChange, totalItems, itemsPerPage } = props;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  console.log("testtt", )

  console.log({ page, totalItems, itemsPerPage });

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
          <button
            disabled={page <= 1 ? "disabled" : ""}
            onClick={() => handleChange(page - 1)}
          >
            {"<"}
          </button>
        </li>
        {[...Array(totalPages).keys()].map((pageItem, index) => {
          return (
            <li key={index + pageItem}>
              <button
                className={`${page === index + 1 ? "active" : ""} `}
                onClick={() => handleChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
        <li>
          <button
            disabled={page >= totalPages ? "disabled" : ""}
            onClick={() => handleChange(page + 1)}
          >
            {">"}
          </button>
        </li>
        <li>
          <button onClick={() => handleChange(totalPages)}>{`>>`}</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
