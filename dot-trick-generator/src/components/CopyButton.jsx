// src/components/CopyButton.jsx
import React from 'react';
import './CopyButton.css';

const CopyButton = ({ onCopy, disabled }) => {
  return (
    <button
      onClick={onCopy}
      className="copy-button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-label="Copy emails to clipboard"
    >
      Copy to Clipboard
    </button>
  );
};

export default CopyButton;
