import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, onPageChange }) => {
  // 페이지 번호 목록을 생성합니다.
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item${currentPage === number ? " active" : ""}`}
        >
          <button
            onClick={() => onPageChange(number)}
            className="page-link"
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
