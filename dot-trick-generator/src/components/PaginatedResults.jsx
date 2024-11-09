// src/components/PaginatedResults.jsx
import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedResults = ({ prefix, provider, total }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16384); // Default to 16K items per page

  const itemsPerPageOptions = [1024, 2048, 4096, 8192, 16384];
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
        console.log('Emails copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy emails:', err);
        alert('Failed to copy emails.');
      });
  };

  // Row component for React Window
  const Row = ({ index, style }) => (
    <div style={style} className="px-6 py-4 whitespace-nowrap">
      {currentEmails[index]}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleCopy}
          disabled={currentEmails.length === 0}
          className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
            currentEmails.length > 0
              ? 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              : 'bg-green-300 cursor-not-allowed'
          } transition-colors duration-300`}
        >
          Copy to Clipboard
        </button>
        <div className="flex items-center">
          <label htmlFor="items-per-page" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
            Items per page:
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-200"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Page {currentPage + 1} of {pageCount.toLocaleString()}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email Variations
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentEmails.map((email, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center space-x-2"}
          previousLinkClassName={"px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
          nextLinkClassName={"px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-indigo-600 text-white"}
        />
      </div>
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
