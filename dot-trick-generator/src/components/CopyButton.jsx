// src/components/CopyButton.jsx
import React, { useState } from 'react';
import './CopyButton.css';

const CopyButton = ({ emails }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (emails.length === 0) return;
    const text = emails.join('\n');
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => alert('Failed to copy emails.'));
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-button"
      disabled={emails.length === 0}
      aria-disabled={emails.length === 0}
      aria-label="Copy emails to clipboard"
    >
      {copied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
};

export default CopyButton;
