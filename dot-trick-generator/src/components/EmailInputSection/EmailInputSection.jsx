// src/components/EmailInputSection/EmailInputSection.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EmailInputSection.css';
import { validatePrefix, calculateEmailCount } from '../../utils/emailUtils';

const EmailInputSection = ({ onGenerate }) => {
  const [prefix, setPrefix] = useState('');
  const [provider, setProvider] = useState('gmail.com');
  const [error, setError] = useState('');

  const handlePrefixChange = (e) => {
    const value = e.target.value;
    setPrefix(value);
    if (!validatePrefix(value)) {
      setError('Prefix must be 6-30 characters long and contain only letters, numbers, and periods.');
    } else {
      setError('');
    }
  };

  const handleGenerate = () => {
    if (!validatePrefix(prefix)) {
      setError('Prefix must be 6-30 characters long and contain only letters, numbers, and periods.');
      return;
    }
    const total = calculateEmailCount(prefix);
    onGenerate({ prefix, provider, total });
  };

  return (
    <div className="email-input-section bg-input-bg dark:bg-gray-700 border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <label htmlFor="email-prefix" className="sr-only">Email Prefix</label>
          <div className="flex">
            <input
              type="text"
              id="email-prefix"
              value={prefix}
              onChange={handlePrefixChange}
              className={`email-input flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-color ${error ? 'border-danger-color' : 'border-border'}`}
              placeholder="Enter email prefix"
              aria-invalid={!!error}
              aria-describedby="error-message"
            />
            <span className="email-suffix inline-flex items-center px-4 py-2 bg-border text-gray-700 rounded-r-lg">
              @{provider}
            </span>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="generate-button bg-primary-color hover:bg-button-hover-primary text-white px-6 py-2 rounded-lg transition-colors disabled:bg-primary-300 disabled:cursor-not-allowed"
          disabled={!!error || !prefix}
          aria-disabled={!!error || !prefix}
        >
          Generate
        </button>
      </div>
      {error && <div id="error-message" className="error-message text-danger-color mt-2">{error}</div>}
      {prefix && !error && (
        <div className="email-count text-gray-800 dark:text-gray-200 mt-4">
          {calculateEmailCount(prefix).toLocaleString()} email variations will be generated.
        </div>
      )}
    </div>
  );
};

EmailInputSection.propTypes = {
  onGenerate: PropTypes.func.isRequired,
};

export default EmailInputSection;
