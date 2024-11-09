// src/components/PaginatedResults.jsx
import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { FixedSizeList as List } from 'react-window';
import './PaginatedResults.css';

const PaginatedResults = ({ prefix, provider, total }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16384); // Default to 16K items per page

  const maxItemsPerPage = 16384;
  const itemsPerPageOptions = [1000, 5000, 10000, 16384];

  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  // Generate emails for the current page
  const currentEmails = useMemo(() => {
    const emails = [];
    const start = currentPage * itemsPerPage;
    const end = Math.min(start + itemsPerPage, total);

    for (let i = start; i < end; i++) {
      emails.push(generateEmail(prefix, i, provider));
    }

    return emails;
  }, [currentPage, prefix, provider, itemsPerPage, total]);

  const handleCopy = () => {
    if (currentEmails.length === 0) return;
    const text = currentEmails.join('\n');
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Emails copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy emails:', err);
        alert('Failed to copy emails.');
      });
  };

  // Row component for React Window
  const Row = ({ index, style }) => (
    <div style={style} className="virtualized-item">
      {currentEmails[index]}
    </div>
  );

  return (
    <div className="paginated-results">
      <div className="results-header">
        <button onClick={handleCopy} className="copy-button" disabled={currentEmails.length === 0}>
          Copy to Clipboard
        </button>
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="page-info">
        Page {currentPage + 1} of {pageCount}
      </div>
      <List
        height={600} // Adjust based on desired height
        itemCount={currentEmails.length}
        itemSize={20} // Adjust based on item height
        width={'100%'}
      >
        {Row}
      </List>
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
        forcePage={currentPage}
      />
    </div>
  );
};

// Helper function to generate email based on variation index
const generateEmail = (prefix, variationIndex, provider) => {
  let email = prefix[0];
  const length = prefix.length;

  for (let i = 1; i < length; i++) {
    // Bitwise operation to determine if a dot should be inserted
    if ((variationIndex & (1 << (i - 1))) !== 0) {
      email += '.';
    }
    email += prefix[i];
  }

  return `${email}@${provider}`;
};

export default PaginatedResults;
