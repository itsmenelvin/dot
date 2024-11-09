// src/components/PaginatedResults.jsx
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './PaginatedResults.css';

const PaginatedResults = ({ emails, itemsPerPage = 50 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(emails.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = emails.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="paginated-results">
      {emails.length > 0 ? (
        <>
          <ul>
            {currentItems.map((email, index) => (
              <li key={offset + index}>{email}</li>
            ))}
          </ul>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </>
      ) : (
        <p>No email variations generated yet.</p>
      )}
    </div>
  );
};

export default PaginatedResults;
