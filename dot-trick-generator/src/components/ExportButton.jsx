// src/components/ExportButton.jsx
import React from 'react';
import './ExportButton.css';

const ExportButton = ({ emails }) => {
  const handleExport = () => {
    if (emails.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8," + emails.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "email_variations.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="export-button"
      disabled={emails.length === 0}
      aria-disabled={emails.length === 0}
      aria-label="Export emails as CSV"
    >
      Export as CSV
    </button>
  );
};

export default ExportButton;
