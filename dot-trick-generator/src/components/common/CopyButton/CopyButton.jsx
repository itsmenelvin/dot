// src/components/common/CopyButton/CopyButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
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

CopyButton.propTypes = {
  onCopy: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CopyButton.defaultProps = {
  disabled: false,
};

export default CopyButton;
